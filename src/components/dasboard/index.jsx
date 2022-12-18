import { useEffect, useState } from 'react'
import axios from 'axios'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import UnApprovedList from '../unapproved_list'


const Dashboard = ({ api }) => {
    const [students, setStudents] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`${api}/students`)
            .then(res => setStudents(res.data.data))
        // console.log(students);
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
                <List>
                    {
                        students.map((std, index) => {
                            return !std.isClassAssign &&
                                <div key={index}>
                                    <ListItem disablePadding >
                                        <ListItemButton>
                                            <ListItemText primary={`${std.name} applied for ${std.course} course`} />
                                            <UnApprovedList api={api} std={std} deLoad={setData} data={data} uniqKey={index} />
                                            <Button variant="contained" onClick={() => approveStudent(std, index)} >Approve</Button>
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider />
                                </div>
                        })
                    }
                </List>
            </Box>
        </div>

    )
}

export default Dashboard