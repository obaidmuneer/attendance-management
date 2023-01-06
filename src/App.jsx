import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { GlobalContext } from "./context/context";

import AddClass from "./components/add_class";
import AddStudent from "./components/add_student";
import Attendance from "./components/attendance";
import Home from "./components/home";
import Navbar from "./components/navbar";
import QrCode from "./components/qrcode";
import Students from "./components/students";
import Student from "./components/student";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";
import StudentProfile from "./components/student_profile";
import ApproveStudents from "./components/approve_students";
import AddStudents from "./components/add_students";
import AddClasses from "./components/add_classes";

const App = () => {
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

      <Navbar />

      <Routes>
        <Route path="/" index element={<QrCode />} />
        <Route path="home" element={<Home />} />
        <Route path="students" element={<Students />} />
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
