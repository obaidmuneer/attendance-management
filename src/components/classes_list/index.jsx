import axios from "axios"
import { useState } from "react"


const ClassesList = ({ api, std, deLoad, data ,uniqKey }) => {
    const [classData, setClassData] = useState([])
    const [selectedBatch, setSelectedBatch] = useState('')
    const [batchList, setBatchList] = useState([])

    const loadData = (e) => {
        deLoad(
            [...data, {
                selectedBatch,
                selectedSec: e.target.value,
                uniqKey
            }]
        )
    }

    const getClass = (std) => {
        axios.get(`${api}/get_class/${std.course}`)
            .then(res => {
                setClassData(res.data.data)
                uniq(res.data.data)
            })
            .catch(err => console.log(err))
    }

    const uniq = (data) => {
        const a = data.map((item) => {
            return item.batch
        })
        const uniqArr = [...new Set(a)];
        setBatchList(uniqArr)
        // api could be added 
    }
    return (
        <span>
            {/* <button onClick={uniq} >Click me</button> */}

            <select defaultValue={"batchno"} onClick={() => getClass(std)} onChange={(e) => setSelectedBatch(e.target.value)}>
                <option value="batchno" disabled >Select batch no..</option>
                {
                    std.course === classData[0]?.course.toLowerCase() && batchList.map((eachClass, index) => {
                        return <option key={index} value={eachClass}>{eachClass}</option>
                    })
                }
            </select>
            {
                (std.course.toLowerCase() === classData[0]?.course.toLowerCase()) &&
                selectedBatch &&
                <select defaultValue={"section_name"} onChange={loadData}>
                    <option value="section_name" disabled>select section ...</option>
                    {
                        classData.map((eachClass, index) => {
                            return eachClass.batch === selectedBatch && <option key={index} value={eachClass.section}>{eachClass.section}</option>
                        })
                    }
                </select>
            }
        </span>
    )
}

export default ClassesList