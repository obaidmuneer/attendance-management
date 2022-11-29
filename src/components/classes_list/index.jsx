import axios from "axios"
import { useState } from "react"


const ClassesList = ({ api, std, deLoad }) => {
    const [classData, setClassData] = useState([])
    const [selectedBatch, setSelectedBatch] = useState('')

    const loadData = (e) => {
        deLoad(
            {
                selectedBatch,
                selectedSec : e.target.value
            }
        )
    }

    const getClass = (std) => {
        axios.get(`${api}/get_class/${std.course}`)
            .then(res => {
                setClassData(res.data.data)
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <select defaultValue={"batchno"} onClick={() => getClass(std)} onChange={(e) => setSelectedBatch(e.target.value)}>
                <option value="batchno" disabled >Select batch no..</option>
                {
                    std.course === classData[0]?.course.toLowerCase() && classData.map((eachClass, index) => {
                        return <option key={index} value={eachClass.batch}>{eachClass.batch}</option>
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
                            return <option key={index} value={eachClass.section}>{eachClass.section}</option>
                        })
                    }
                </select>
            }
        </div>
    )
}

export default ClassesList