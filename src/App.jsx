import { Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './components/home';
import Student from './components/student';
import Attendance from './components/attendance';
import AddStudent from './components/add_student';
import AddClass from './components/add_class';
import QrCode from './components/qrcode';
import ResponsiveAppBar from './components/navbar';

let api = ''
if (window.location.protocol === 'http:') {
  api = 'http://localhost:8080'
} else {
  api = 'https://attendance-management-server.up.railway.app'
}

const App = () => {

  return (
    <div className="App">
      <div className="App-container">
        <ResponsiveAppBar />
      
        <Routes>
          <Route path='/' element={<QrCode api={api} />} />
          <Route path='home' element={<Home api={api} />} />
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
