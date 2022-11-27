import StudentsList from '../students_list'
import axios from "axios"
import { useEffect, useState } from "react"

const Student = ({ api }) => {
  const [students, setStudents] = useState([])
  useEffect(() => {
    axios.get(`${api}/students`)
      .then(res => setStudents(res.data.data))
      .catch(err => setStudents(null))

    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <StudentsList students={students} />
    </div>
  )
}

export default Student