import { useEffect, useState } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Loader from "../../ui-components/loader";
import MCard from "../../ui-components/mcard";
import MTable from "../../ui-components/mtable";
import Grid from "@mui/material/Grid";

const columns = [
  { id: "selected_date", label: "Date", minWidth: 170 },
  { id: "marked_attendance", label: "Attendance Status", minWidth: 170 },
];

const Attendance = ({ api }) => {
  const [students, setStudents] = useState([]);
  const [roll, setRoll] = useState("");
  const [student, setStudent] = useState(null);
  const [selected_date, setSelected_date] = useState("");
  const [marked_attendance, setMarked_attendance] = useState("");
  const [loadedAttend, setLoadedAttend] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSec, setSelectedSec] = useState("");
  const [classData, setClassData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(`${api}/student/${roll}`)
      .then((res) => {
        setStudent(res.data.student);
        loadAttendance(res.data.student.roll);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
    console.log(student);
  };

  useEffect(() => {
    document.querySelector('#standard-number').focus()
  }, [])

  const handleAttendance = (e) => {
    e.preventDefault();
    console.log(marked_attendance);
    axios
      .post(`${api}/mark_attandance`, {
        roll: student.roll,
        marked_attendance,
        selected_date,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const loadStudents = () => {
    // console.log(e.target.value);
    axios
      .post(`${api}/class/${selectedCourse}`, {
        batch: selectedBatch,
        section: selectedSec,
      })
      .then((res) => {
        // console.log(res.data)
        setStudents(res.data.students);
      })
      .catch((err) => setStudents(null));
    // console.log(students);
  };

  const loadAttendance = (roll) => {
    axios
      .get(`${api}/marked_attendance/${roll || student.roll}`)
      .then((res) => {
        setLoading(false);
        setLoadedAttend(res.data.attendance);
      })
      .catch((err) => {
        console.log(err)
        setLoading(false);
      });
  };

  const getClass = () => {
    axios
      .get(`${api}/get_class/${selectedCourse}`)
      .then((res) => {
        setClassData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ padding: 5 }}>
      <h1>Attendance Summary Page</h1>
      <Loader loading={loading} />

      {/* <span>Load Students</span>
      <select
        defaultValue={"course"}
        onChange={(e) => setSelectedCourse(e.target.value)}
      >
        <option value="course" disabled>
          Select Course
        </option>
        <option value="chatbot">Chatbot</option>
        <option value="web">Web</option>
        <option value="graphic">Graphic</option>
      </select>

      <div>
        {selectedCourse && (
          <select
            defaultValue={"batchno"}
            onClick={getClass}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            <option value="batchno" disabled>
              Select batch no..
            </option>
            {classData.map((eachClass, index) => {
              return (
                <option key={index} value={eachClass.batch}>
                  {eachClass.batch}
                </option>
              );
            })}
          </select>
        )}
        {selectedBatch && (
          <select
            defaultValue={"section_name"}
            onChange={(e) => setSelectedSec(e.target.value)}
          >
            <option value="section_name" disabled>
              select section ...
            </option>
            {classData.map((eachClass, index) => {
              return (
                <option key={index} value={eachClass.section}>
                  {eachClass.section}
                </option>
              );
            })}
          </select>
        )}
        {selectedSec && <button onClick={loadStudents}>Load Students</button>}
      </div>

      <StudentsList students={students} /> */}


      <Grid container spacing={2}
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item xs={'auto'} >


          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
              display: "flex",
              alignItems: "center",
              mr: 1,
            }}
            // noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              id="standard-number"
              label="Please enter a roll number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              onChange={(e) => setRoll(+e.target.value)}
              value={roll}
            />
            <Button type="submit" variant="contained" size="medium">
              Submit
            </Button>
          </Box>
        </Grid>

        {student && student.isClassAssign && (
          <Grid item xs={'auto'}>
            <MCard student={student} />
          </Grid>
        )}
      </Grid>

      {/* <div> */}
      {/* {student && student.isClassAssign && ( */}
      {/* <div> */}
      {/* <StudentCard student={student} /> */}
      {/* <form onSubmit={handleAttendance}>
              <span>Select Date</span>
              <input
                type="date"
                name=""
                id=""
                onChange={(e) => setSelected_date(e.target.value)}
              />
              <br />
              <span>Mark Attendance</span>
              <select
                defaultValue={"DEFAULT"}
                onChange={(e) => setMarked_attendance(e.target.value)}
              >
                <option value="DEFAULT" disabled>
                  Choose Attendance ...
                </option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="leave">Leave</option>
              </select>
              <input type="submit"></input>
            </form> */}
      {/* </div> */}
      {/* )} */}
      {/* </div> */}

      <div>
        {student && (
          <div>
            <h2>Student's Attendance Detail</h2>
            {loadedAttend.length > 0 ? <MTable attendance={loadedAttend} columns={columns} height={440} /> : "No Data Found"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
