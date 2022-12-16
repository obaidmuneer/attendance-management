import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";

import sucessAudio from "../../assets/sucess_beep.mp3";

import "./index.css";

const Attendance = ({ api }) => {
  const [roll, setRoll] = useState("");
  const [student, setStudent] = useState(null);
  const [msg, setMsg] = useState(null);
  const [flag, setFlag] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAttendance();
  };

  const handleAttendance = async (roll_num) => {
    console.log(roll);
    try {
      const result = await axios.post(`${api}/mark_attendance`, {
        roll: roll_num || roll,
        marked_attendance: "present",
        selected_date: moment(Date.now()).format("MMM Do YY"),
      });
      console.log(result.data.msg);
      setMsg(result.data.msg);
      setStudent(result.data.student);
      //   setTimeout(() => {
      //     setStudent(null);
      //     setMsg(null);
      //     setRoll("");
      //   }, 3000);
      // console.log(result.data.student);
    } catch (error) {
      console.log(error.message);
      setMsg(error.message);
      //   setTimeout(() => {
      //     setMsg(null);
      //     setRoll("");
      //   }, 3000);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      document.querySelector("#roll_num").focus();
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <form
        style={
          flag
            ? {
                transform: "translateY(-100%)",
                margin: "-75px",
                transition: "transform ease-in-out 0.2s",
              }
            : {
                transform: "translateY(0)",
                transition: "transform ease-in-out 0.2s",
              }
        }
        onSubmit={handleSubmit}
      >
        <div className={"webflow-style-input"}>
          <input
            className="roll"
            id="roll_num"
            autoComplete="off"
            type="text"
            placeholder="Enter Roll Number!"
            onChange={(e) => {
              setRoll(e.target.value);
              setFlag(false);
              setTimeout(() => {
                setFlag(true);
              }, 2000);
            }}
            value={roll}
          />
          <button type="submit">
            <i className="roll_btn icon ion-android-arrow-forward"></i>
            {">"}
          </button>
        </div>
      </form>

      {msg ? (
        <div>
          <h3>{msg}</h3>
        </div>
      ) : (
        <h3>Please Show Your ID Card To Mark Your Attendance</h3>
      )}

      <div className="sub-container">
        <QrReader
          className="qrcode"
          onResult={(result, error) => {
            if (!!result) {
              console.log(result.text);
              new Audio(sucessAudio).play();
              setRoll(+result?.text);
              handleAttendance(+result?.text);
            }

            // if (!!error) {
            //     console.info(error);
            // }
          }}
          scanDelay={"500"}
        />

        {student?.isClassAssign ? (
          <div className="card">
            <p>Student Name : {student?.name}</p>
            <p>Roll : {student?.roll}</p>
            <p>Attandance Time : {moment(Date.now()).format("MMM Do YY")}</p>
            <p>Course : {student?.course}</p>
          </div>
        ) : null}
      </div>

      {msg && (
        <div className="assit-msg">
          <p>To Mark Your Attendance Please your ID Card in Camera</p>
        </div>
      )}
    </div>
  );
};

export default Attendance;
