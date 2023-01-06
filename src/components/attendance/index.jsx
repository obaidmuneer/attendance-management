import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

import Loader from "../../ui-components/loader";
import MTable from "../../ui-components/mtable";
import { GlobalContext } from "../../context/context";

const columns = [
  { id: "selected_date", label: "Date", minWidth: 170 },
  { id: "marked_attendance", label: "Attendance Status", minWidth: 170 },
];

const Attendance = () => {
  const { state } = useContext(GlobalContext)
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
  const { studentRoll } = useParams();


  const handleAttendance = (e) => {
    e.preventDefault();
    console.log(marked_attendance);
    axios
      .post(`${state.api}/attendance/${student.roll}`, {
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
      .post(`${state.api}/attendance/${selectedCourse}`, {
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

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${state.api}/attendance/${studentRoll}`)
      .then((res) => {
        setLoading(false);
        setLoadedAttend(res.data.attendance);
      })
      .catch((err) => {
        console.log(err)
        setLoading(false);
      });
  }, [])


  const getClass = () => {
    axios
      .get(`${state.api}/get_class/${selectedCourse}`)
      .then((res) => {
        setClassData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ padding: 5 }}>
      {/* <h1>Attendance Summary Page</h1> */}
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
        {loadedAttend.length > 0 ? (
          <div>
            <h2>Student's Attendance Detail</h2>
            <MTable data={loadedAttend} columns={columns} height={440} />
          </div>
        ) : "Something is wrong"}
      </div>
    </div>
  );
};

export default Attendance;
