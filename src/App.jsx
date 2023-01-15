import { useContext, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import AddClass from "./components/add_class";
import AddClasses from "./components/add_classes";
import AddStudent from "./components/add_student";
import AddStudents from "./components/add_students";
import ApproveStudents from "./components/approve_students";
import Attendance from "./components/attendance";
import Home from "./components/home";
import Navbar from "./components/navbar";
import QrCode from "./components/qrcode";
import Students from "./components/students";
import Student from "./components/student";
import StudentProfile from "./components/student_profile";

import { GlobalContext } from "./context/context";

import "./App.css";
import Claxxex from "./components/claxxex";

const App = () => {
  const url = useLocation()
  let { state, dispatch } = useContext(GlobalContext);
  // console.log(state);
  const darkTheme = createTheme({
    palette: {
      mode: state.theme,
    },
  });

  useEffect(() => {
    dispatch({
      type: "theme",
      payload: Boolean(localStorage.theme) ? localStorage.theme :
        window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark",
    })
    //eslint-disable-next-line
  }, [])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <div className={url.pathname === '/' ? 'nav-container' : null} >
        <div className={url.pathname === '/' ? 'navbar' : null} >
          <Navbar />
        </div>
      </div>

      <Routes>
        <Route path="/" index element={<QrCode />} />
        <Route path="home" element={<Home />} />
        <Route path="students" element={<Students />} />
        <Route path="classes" element={<Claxxex />} />
        <Route path="add_student" element={<AddStudent />} />
        <Route path="add_students" element={<AddStudents />} />
        <Route path="approve_students" element={<ApproveStudents />} />
        <Route path="student" element={<Student />} >
          <Route path="attendance/:studentRoll" index element={<Attendance />} />
          <Route path="profile/:studentRoll" element={<StudentProfile />} />
        </Route>
        <Route path="add_class" element={<AddClass />} />
        <Route path="add_classes" element={<AddClasses />} />
      </Routes>

    </ThemeProvider>
  );
};

export default App;
