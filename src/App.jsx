import { Routes, Route, Link } from 'react-router-dom'
import './App.css';
import Home from './components/home';
import Student from './components/student';
import Attendance from './components/attendance';
import AddStudent from './components/add_student';
import AddClass from './components/add_class';
import QrCode from './components/qrcode';

let api = ''
if (window.location.protocol === 'http:') {
  api = 'http://localhost:8080'
} else {
  api = 'https://attendance-management-server-production.up.railway.app'
}

const App = () => {

  return (
    <div className="App">
      <div className="App-container">
        {/* <h3>Attendance Management System</h3> */}

        {/* <ul>
          <li><Link to={'/'} >Home</Link></li>
          <li><Link to={'student'} >Student</Link></li>
          <li><Link to={'attendance'} >Attendance</Link></li>
          <li><Link to={'add_class'} >Add Class</Link></li>
        </ul> */}
        <Routes>
          <Route path='/' element={<QrCode api={api} />} />
          <Route path='student' element={<Student api={api} />} />
          <Route path='add_student' element={<AddStudent api={api} />} />
          <Route path='attendance' element={<Attendance api={api} />} />
          <Route path='add_class' element={<AddClass api={api} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
