import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css';

const App = () => {
  const [students, setStudents] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080/students')
      .then(res => setStudents(res.data.data))
    console.log(students);
  }, [])

  return (
    <div className="App">
      <div className="App-header">
        <h3>Attendance Management System</h3>
        <h6>Dashbord</h6>
        {
          students.map((std, index) => {
            return !std.isClassAssign && <div key={index}>{std.name} applied for {std.course} course</div>
          })
        }
      </div>
    </div>
  );
}

export default App;
