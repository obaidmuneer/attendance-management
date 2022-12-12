import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ClassesList from '../classes_list'



const Dashboard = ({ api }) => {
    const [students, setStudents] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`${api}/students`)
            .then(res => setStudents(res.data.data))
        // console.log(students);
        // eslint-disable-next-line
    }, [])

    const approveStudent = (std, index) => {
        // console.log(data);
        const filteredData = data.filter((item) => {
            return item.uniqKey === index
        })
        // console.log(filteredData[0].selectedBatch);
        axios.post(`${api}/enroll_student`, {
            course: std.course,
            roll: std.roll,
            batch: filteredData[0].selectedBatch,
            section: filteredData[0].selectedSec
        })
        let studentData = students.filter((eachStd, index) => {
            return eachStd.roll !== std.roll
        })
        setStudents(studentData)
    }

    return (
        <div>
            <h3>Dashbord</h3>
            {
                students.map((std, index) => {
                    return !std.isClassAssign && <div key={index}>{std.name} applied for {std.course} course
                        <ClassesList api={api} std={std} deLoad={setData} data={data} uniqKey={index} />
                        <input type="button" value="Approve" onClick={() => approveStudent(std, index)} />
                    </div>
                })
            }
        </div>

    )
}

export default Dashboard