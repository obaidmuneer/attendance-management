import axios from "axios"
import moment from 'moment'
import { useState } from "react"
import { QrReader } from 'react-qr-reader';

import sucessAudio from '../../assets/sucess_beep.mp3'

import './index.css'

const Attendance = ({ api }) => {
    const [roll, setRoll] = useState('')
    const [student, setStudent] = useState(null)
    const [msg, setMsg] = useState(null)
    const [flag, setFlag] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAttendance()
    }

    const handleAttendance = async (roll_num) => {
        console.log(roll);
        try {
            const result = await axios.post(`${api}/mark_attandance`, {
                roll: roll_num || roll,
                marked_attendance: 'Present',
                selected_date: moment(Date.now()).format("MMM Do YY")
            })
            setMsg(result.data.msg)
            setStudent(result.data.student)
            setTimeout(() => {
                setStudent(null)
                setMsg(null)
                setRoll('')
            }, 3000)
            // console.log(result.data.student);

        } catch (error) {
            console.log(error.message);
            setMsg(error.message)
            setTimeout(() => {
                setMsg(null)
                setRoll('')
            }, 3000)
        }
    }

    setInterval(() => {
        document.querySelector('#roll_num').focus()
    }, 500)

    return (
        <div className="container">

            <form style={flag ? {opacity: 0} : {opacity: 1}} onSubmit={handleSubmit}>
                <div className="webflow-style-input">
                    <input className="roll" id="roll_num" autoComplete="off" type="text"
                        placeholder="Enter Roll Number!" onChange={e => {
                            setRoll(e.target.value)
                            setFlag(false)
                            setTimeout(() => {
                                setFlag(true)
                            }, 2000);
                        }} value={roll} />
                    <button type="submit"><i className="roll_btn icon ion-android-arrow-forward"></i>{'>'}</button>
                </div>
            </form>

            {
                msg ? <div className="msg">
                    <h1>{msg}</h1>
                    {student?.isClassAssign ?
                        <div className="card">
                            <p>Student Name : {student?.name}</p>
                            <p>Roll  : {student?.roll}</p>
                            <p>Attandance Time : {moment(Date.now()).format("MMM Do YY")}</p>
                            <p>Course : {student?.course}</p>
                        </div>
                        : null}
                </div> : <h1>Please Mark Your Attendance</h1>
            }


            <QrReader
                className="qrcode"
                onResult={(result, error) => {
                    if (!!result) {
                        console.log(result.text);
                        new Audio(sucessAudio).play();
                        setRoll(+result?.text)
                        handleAttendance(+result?.text)
                    }

                    // if (!!error) {
                    //     console.info(error);
                    // }
                }}
                scanDelay={'500'}
            />

        </div>
    )
}

export default Attendance