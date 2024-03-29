import { useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";
import { QrReader } from "react-qr-reader";
import { Typography, Box, TextField } from "@mui/material";

import sucessAudio from "../../assets/audio/sucess_beep.mp3";
import { GlobalContext } from "../../context/context";
import "./index.css";
import MCard from "../../ui-components/mcard";
import MModal from "../../ui-components/MModal";
import guideGif from '../../assets/guide.gif'

const Attendance = () => {
  const { state } = useContext(GlobalContext);
  const [roll, setRoll] = useState("");
  const [student, setStudent] = useState(null);
  const [msg, setMsg] = useState(null);
  const [flag, setFlag] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAttendance();
  };

  const handleAttendance = async (roll_num) => {
    try {
      const result = await axios.post(`${state.api}/attendance/${roll_num || roll}`, {
        marked_attendance: "present",
        selected_date: moment(Date.now()).format("MMM Do YY"),
      });
      console.log(result.data.msg);
      setMsg(result.data.msg);
      setStudent(result.data.student);
      new Audio(sucessAudio).play()
      setTimeout(() => {
        setRoll("");
      }, 5000);

      //   setTimeout(() => {
      //     setStudent(null);
      //     setMsg(null);
      //     setRoll("");
      //   }, 3000);
      // console.log(result.data.student);
    } catch (error) {
      console.log(error.response.data.msg)
      setMsg(error.response.data.msg);
      //   setTimeout(() => {
      //     setMsg(null);
      //     setRoll("");
      //   }, 3000);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      document.querySelector("#standard-basic").focus();
    }, 500);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="container">
      <div
        style={
          flag
            ? {
              transform: "translateY(-200%)",
              transition: "transform ease-in-out 0.2s",
            }
            : {
              transform: "translateY(0)",
              transition: "transform ease-in-out 0.2s",
            }
        }
      >
        <Box
          component="form"

          sx={{
            '& > :not(style)': { m: 1, width: '12ch' },

          }}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField id="standard-basic" label="Student's Roll No" variant="standard" onChange={(e) => {
            setRoll(e.target.value);
            setFlag(false);
            setTimeout(() => {
              setFlag(true);
            }, 2000);
          }}
            value={roll}

          />
        </Box>
      </div>

      {msg ? (
        <Typography variant="h5" >{msg}</Typography>
      ) : (
        <Typography variant="h5" >Please Show Your ID Card To Mark Your Attendance</Typography>
      )}

      <MModal img={guideGif} label='guide'  />


      <div className="sub-container">
        <QrReader
          className="qrcode"
          onResult={(result, error) => {
            if (!!result) {
              // console.log(result.text);
              handleAttendance(+result?.text)
            }

            // if (!!error) {
            //     console.info(error);
            // }
          }}
          scanDelay={"5000"}
        />

        {
          student && <MCard student={student} />
        }
      </div>

      {msg && (
        <div className="assit-msg">
          <Typography variant="body" >To Mark Your Attendance Please your ID Card in Camera</Typography>
          <p></p>
        </div>
      )}
    </div>
  );
};

export default Attendance;
