import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Dashboard = ({ api }) => {
    const [students, setStudents] = useState([])

    useEffect(() => {
        axios.get(`${api}/students`)
            .then(res => setStudents(res.data.data))
        console.log(students);
        // eslint-disable-next-line
    }, [])

    const approveStudent = (std) => {
        // console.log(std);
        axios.post(`${api}/enroll_student`, {
            course: std.course,
            roll: std.roll
        })
        let data = students.filter((eachStd,index) => {
            return eachStd.roll !== std.roll
        })
        // console.log(data);
        setStudents(data)

    }
    return (
        <div>
            <h3>Dashbord</h3>

            <Link to={'add_student'} >Add Student</Link>
            {
                students.map((std, index) => {
                    return !std.isClassAssign && <div key={index}>{std.name} applied for {std.course} course
                        <input type="button" value="Approve" onClick={() => approveStudent(std)} /> </div>
                })
            }
        </div>

    )
}

export default Dashboard