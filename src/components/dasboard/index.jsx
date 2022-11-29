import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ClassesList from '../classes_list'


const Dashboard = ({ api }) => {
    const [students, setStudents] = useState([])
    const [classData, setClassData] = useState([])
    const [selectedBatch, setSelectedBatch] = useState('')
    const [selectedSec, setSelectedSec] = useState('')

    useEffect(() => {
        axios.get(`${api}/students`)
            .then(res => setStudents(res.data.data))
        // console.log(students);
        // getClasses()
        // eslint-disable-next-line
    }, [])

    const approveStudent = (std) => {
        // console.log(std);
        axios.post(`${api}/enroll_student`, {
            course: std.course,
            roll: std.roll,
            batch: selectedBatch,
            section: selectedSec
        })
        let data = students.filter((eachStd, index) => {
            return eachStd.roll !== std.roll
        })
        // console.log(data);
        setStudents(data)

    }

    // const getClasses = () => {
    //     axios.get(`${api}/get_classes`)
    //         .then(res => setClasses(res.data.data))
    //         .catch(err => console.log(err))
    // }

    const getClass = (std) => {
        axios.get(`${api}/get_class/${std.course}`)
            .then(res => {
                // console.log(res.data.data[0].course);
                // console.log(std.course);
                // console.log(std.course == res.data.data[0].course.toLowerCase());
                setClassData(res.data.data)
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <h3>Dashbord</h3>

            <Link to={'add_student'} >Add Student</Link>
            {
                students.map((std, index) => {
                    return !std.isClassAssign && <div key={index}>{std.name} applied for {std.course} course
                        {/* <ClassesList stdCourse={std.course} classes={classes} defaultVal={"select_course"} fetchedVal={"course"} /> */}

                        {/* <input type="button" value="Check" onClick={() => getClass(std)} /> */}
                        <select defaultValue={"batchno"} onClick={() => getClass(std)} onChange={(e) => setSelectedBatch(e.target.value)}>
                            <option value="batchno" disabled >Select batch no..</option>
                            {
                                std.course == classData[0]?.course.toLowerCase() && classData.map((eachClass, index) => {
                                    return <option key={index} value={eachClass.batch}>{eachClass.batch}</option>
                                })
                            }
                        </select>
                        {
                            (std.course == classData[0]?.course.toLowerCase()) &&
                            selectedBatch &&
                            <select defaultValue={"section_name"} onChange={(e) => setSelectedSec(e.target.value)}>
                                <option value="section_name" disabled>select section ...</option>
                                {
                                    classData.map((eachClass, index) => {
                                        return <option key={index} value={eachClass.section}>{eachClass.section}</option>
                                    })
                                }
                            </select>
                        }
                        <input type="button" value="Approve" onClick={() => approveStudent(std)} />
                    </div>
                })
            }
        </div>

    )
}

export default Dashboard