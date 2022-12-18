import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Student from "./components/student";
import Attendance from "./components/attendance";
import AddStudent from "./components/add_student";
import AddClass from "./components/add_class";
import QrCode from "./components/qrcode";
import ResponsiveAppBar from "./components/navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useContext, useEffect } from "react";
import { GlobalContext } from "./context/context";

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
      type: 'theme',
      payload: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    })
  }, [])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <div className="App">
        <div className="App-container">
          <ResponsiveAppBar />

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
