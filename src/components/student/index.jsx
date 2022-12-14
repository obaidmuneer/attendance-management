import axios from "axios"
import { useEffect, useState } from "react"
import StudentTable from '../student_table'

const Student = ({ api }) => {
  const [students, setStudents] = useState([])
  useEffect(() => {
    axios.get(`${api}/students`)
      .then(res => {
        // console.log(res.data.data);
        setStudents(res.data.data)
      })
      .catch(err => setStudents(null))

    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <StudentTable students={students} />
    </div>
  )
}

export default Student