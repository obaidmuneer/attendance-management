import { Link } from "react-router-dom"
import Dashboard from "../dasboard"


const Home = ({ api }) => {
    return (
        <div>
            <h3>Attendance Management System</h3>

            <ul>
                <li><Link  to={'/'} >Mark Attendance</Link></li>
                <li><Link  to={'/home'} >Home</Link></li>
                <li><Link  to={'/student'} >Student</Link></li>
                <li><Link  to={'/attendance'} >Attendance</Link></li>
                <li><Link  to={'/add_class'} >Add Class</Link></li>
            </ul>
            <Dashboard api={api} />
        </div>
    )
}

export default Home