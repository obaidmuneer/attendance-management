import { useEffect, useState } from 'react'
import axios from 'axios'

const Dashboard = () => {
    const [students, setStudents] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/students')
            .then(res => setStudents(res.data.data))
        console.log(students);
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <h6>Dashbord</h6>
            {
                students.map((std, index) => {
                    return !std.isClassAssign && <div key={index}>{std.name} applied for {std.course} course</div>
                })
            }
        </div>

    )
}

export default Dashboard