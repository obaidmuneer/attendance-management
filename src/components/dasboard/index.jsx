import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ClassesList from '../classes_list'



const Dashboard = ({ api }) => {
    const [students, setStudents] = useState([])
    const [data, setData] = useState({})

    useEffect(() => {
        axios.get(`${api}/students`)
            .then(res => setStudents(res.data.data))
        // console.log(students);
        // eslint-disable-next-line
    }, [])

    const approveStudent = (std) => {
        axios.post(`${api}/enroll_student`, {
            course: std.course,
            roll: std.roll,
            batch: data.selectedBatch,
            section: data.selectedSec
        })
        let studentData = students.filter((eachStd, index) => {
            return eachStd.roll !== std.roll
        })
        setStudents(studentData)
    }

    return (
        <div>
            <h3>Dashbord</h3>
            <Link to={'add_student'} >Add Student</Link>
            {
                students.map((std, index) => {
                    return !std.isClassAssign && <div key={index}>{std.name} applied for {std.course} course
                        <ClassesList api={api} std={std} deLoad={setData} />
                        <input type="button" value="Approve" onClick={() => approveStudent(std)} />
                    </div>
                })
            }
        </div>

    )
}

export default Dashboard