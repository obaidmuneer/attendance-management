import axios from "axios"
import moment from 'moment'
import { useState } from "react"
import StudentsList from "../students_list"

const Attendance = ({ api }) => {
    const [students, setStudents] = useState([])
    const [roll, setRoll] = useState('')
    const [student, setStudent] = useState(null)
    const [selected_date, setSelected_date] = useState('')
    const [marked_attendance, setMarked_attendance] = useState('')
    const [loadedAttend, setLoadedAttend] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get(`${api}/student/${roll}`)
            .then(res => setStudent(res.data.student))
            .catch(err => console.error(err))
        console.log(student);
    }
    const handleAttendance = (e) => {
        e.preventDefault();
        console.log(marked_attendance);
        axios.post(`${api}/mark_attandance`, {
            roll: student.roll,
            marked_attendance,
            selected_date
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))        
    }

    const loadCourses = (e) => {
        // console.log(e.target.value);
        axios.get(`${api}/class/${e.target.value}`)
            .then(res => setStudents(res.data.data.students))
            .catch(err => setStudents(null))
        console.log(students);
    }

    const loadAttendance = () => {
        axios.get(`${api}/marked_attendance/${student.roll}`)
            .then(res => setLoadedAttend(res.data.attendance))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h3>Attendance</h3>
            <span>Load Students</span>
            <select defaultValue={"course"} onChange={loadCourses}>
                <option value="course" disabled >Select Course</option>
                <option value="chatbot">Chatbot</option>
                <option value="web">Web</option>
                <option value="graphic">Graphic</option>
            </select>
            <StudentsList students={students} />

            <div>
                <h2>Mark Attendance</h2>
                <form onSubmit={handleSubmit} >
                    <input type="number" onChange={(e) => setRoll(+e.target.value)} />
                    <input type="submit"></input>
                </form>

                {
                    (student && student.isClassAssign) ? <div>
                        <ul>
                            <li>{moment(Date.now()).format("MMM Do YY")}</li>
                            <li>{student.name} {student.fathername}</li>
                            <li>{student.course}</li>
                        </ul>
                        <form onSubmit={handleAttendance} >
                            <span>Select Date</span>
                            <input type="date" name="" id="" onChange={(e) => setSelected_date(e.target.value)} /><br />
                            <span>Mark Attendance</span>
                            <select defaultValue={'DEFAULT'} onChange={(e) => setMarked_attendance(e.target.value)}>
                                <option value="DEFAULT" disabled>Choose Attendance ...</option>
                                <option value="present" >Present</option>
                                <option value="absent">Absent</option>
                                <option value="leave">Leave</option>
                            </select>
                            <input type="submit"></input>
                        </form>
                    </div>
                        :
                        <div>
                            <p>sad ={'>'} :(</p>
                        </div>
                }
            </div>

            <div>
                {student &&
                    <div>
                        <h2>Load Attendance</h2>
                        <button onClick={loadAttendance} >Load Attendance</button>
                        <ul>
                            {
                                loadedAttend.map((eachAttend, index) => {
                                    return <li key={index} >date : {eachAttend.selected_date} {eachAttend.marked_attendance} </li>
                                })
                            }
                        </ul>

                    </div>}

            </div>

        </div>
    )
}

export default Attendance