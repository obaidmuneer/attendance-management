import { useEffect, useState } from 'react'
import axios from 'axios'
import ClassesList from '../classes_list'
import StudentCard from '../student_card'
import Stack from "@mui/material/Stack";
import Carousel from 'react-material-ui-carousel'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';


const Dashboard = ({ api }) => {
    const [students, setStudents] = useState([])
    const [topStudents, setTopStudents] = useState([])
    const [checkStudents, setCheckStudents] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`${api}/students`)
            .then(res => setStudents(res.data.data))
        // console.log(students);
        axios.post(`${api}/top_check_std`)
            .then(res => {
                setTopStudents(res.data.topStudents)
                setCheckStudents(res.data.checkStudents)
            })
        // eslint-disable-next-line
    }, [])

    const approveStudent = (std, index) => {
        // console.log(data);
        const filteredData = data.filter((item) => {
            return item.uniqKey === index
        })
        // console.log(filteredData[0].selectedBatch);
        axios.post(`${api}/enroll_student`, {
            course: std.course,
            roll: std.roll,
            batch: filteredData[0].selectedBatch,
            section: filteredData[0].selectedSec
        })
        let studentData = students.filter((eachStd, index) => {
            return eachStd.roll !== std.roll
        })
        setStudents(studentData)
    }

    return (
        <div style={{ padding: '1%' }} >
            <h3>Dashbord</h3>

            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <List >
                    {
                        students.map((std, index) => {
                            return !std.isClassAssign && <div key={index}>
                                <ListItem disablePadding >
                                    <ListItemButton>
                                        <ListItemText primary={`${std.name} applied for ${std.course} course`} />
                                        <ClassesList api={api} std={std} deLoad={setData} data={data} uniqKey={index} />
                                        <Button variant="contained" onClick={() => approveStudent(std, index)} >Approve</Button>
                                    </ListItemButton>
                                </ListItem>
                                <Divider />

                            </div>
                        })
                    }
                </List>
            </Box>



            <Stack direction="row" sx={{ justifyContent: "space-around" }} spacing={2}>
                <div className='carousel-container' >
                    <Typography variant='h5'> Top Students by Attendance</Typography>
                    <Carousel
                        indicators={false}
                        height={150}
                    // sx={{ width: '25%' }}
                    >

                        {
                            topStudents.map(student => {
                                return <StudentCard key={student.roll} student={student} />
                            })
                        }
                    </Carousel>
                </div>

                <div>
                    <Typography variant='h5'> Attension needed Students</Typography>
                    <Carousel
                        indicators={false}
                        height={150}
                    // sx={{ width: '25%' }}
                    >

                        {
                            checkStudents.map(student => {
                                return <StudentCard key={student.roll} student={student} />
                            })
                        }
                    </Carousel>
                </div>
            </Stack>

        </div>

    )
}

export default Dashboard