import axios from "axios"
import moment from 'moment'
import { useState } from "react"

const Attendance = ({ api }) => {
    const [roll, setRoll] = useState('')
    const [student, setStudent] = useState(null)
    const [selected_date, setSelected_date] = useState('')
    const [marked_attendance, setMarked_attendance] = useState('')

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

    return (
        <div>
            <h3>Attendance</h3>
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
    )
}

export default Attendance