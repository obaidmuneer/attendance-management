import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { GlobalContext } from "./context/context";
import AddClass from "./components/add_class";
import AddStudent from "./components/add_student";
import Attendance from "./components/attendance";
import Home from "./components/home";
import Navbar from "./components/navbar";
import QrCode from "./components/qrcode";
import Student from "./components/student";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";

let api = "";
if (window.location.protocol === "http:") {
  api = "http://localhost:8080";
} else {
  api = "https://attendance-management-server.up.railway.app";
}

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

      <div className="App">
        <div className="App-container">
          <Navbar />

          <Routes>
            <Route path="/" element={<QrCode api={api} />} />
            <Route path="home" element={<Home api={api} />} />
            <Route path="student" element={<Student api={api} />} />
            <Route path="add_student" element={<AddStudent api={api} />} />
            <Route path="attendance" element={<Attendance api={api} />} />
            <Route path="add_class" element={<AddClass api={api} />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
