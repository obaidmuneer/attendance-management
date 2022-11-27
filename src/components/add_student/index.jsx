import axios from "axios"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'

const AddStudent = ({ api }) => {
    const [name, setName] = useState('')
    const [fathername, setFathername] = useState('')
    const [contact, setContact] = useState('')
    const [cnic, setCnic] = useState('')
    const [course, setCourse] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${api}/students`, {
            name,
            fathername,
            contact,
            cnic,
            course //make the list to be fethced from server
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        navigate('/')

    }

    return (
        <div>
            <h1>Add Student</h1>
            <form onSubmit={handleSubmit}>
                <span>Name :</span> <input type="text" onChange={(e) => setName(e.target.value)} value={name} /> <br />
                <span>Father Name :</span> <input type="text" onChange={(e) => setFathername(e.target.value)} value={fathername} /> <br />
                <span>Contact No:</span> <input type="number" onChange={(e) => setContact(+e.target.value)} value={contact} /> <br />
                <span>Cnic: </span><input type="number" onChange={(e) => setCnic(e.target.value)} value={cnic} /> <br />
                <span>Course :</span>
                <select defaultValue={"course"} onChange={(e) => setCourse(e.target.value)}>
                    <option value="course" disabled >Select Course</option>
                    <option value="web">WEB</option>
                    <option value="graphic">Graphic</option>
                </select> <br />
                <input type="submit" value="Add Student" />
            </form>
        </div>
    )
}

export default AddStudent