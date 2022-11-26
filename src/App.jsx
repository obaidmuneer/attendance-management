import { Routes, Route, Link } from 'react-router-dom'
import './App.css';
import Home from './components/home';
import Student from './components/student';
import Attendance from './components/attendance';

let api = 'http://localhost:8080'

const App = () => {

  return (
    <div className="App">
      <div className="App-container">
        <h3>Attendance Management System</h3>

        <ul>
          <li><Link to={'/'} >Home</Link></li>
          <li><Link to={'/student'} >Student</Link></li>
          <li><Link to={'attendance'} >Attendance</Link></li>
        </ul>
        <Routes>
          <Route path='/' element={<Home api={api} />} />
          <Route path='/student' element={<Student api={api} />} />
          <Route path='/attendance' element={<Attendance api={api} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
