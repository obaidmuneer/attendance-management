import { Routes, Route, Link } from 'react-router-dom'
import './App.css';
import Home from './components/home';
import Student from './components/student';
import Attendance from './components/attendance';

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
          <Route path='/' element={<Home />} />
          <Route path='/student' element={<Student />} />
          <Route path='/attendance' element={<Attendance />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
