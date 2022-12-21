import { useEffect, useState } from 'react'
import axios from 'axios'

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import UnApprovedList from '../unapproved_list'
import { Grid } from '@mui/material';
import MSkeleton from '../../ui-components/mskeleton';


const Dashboard = ({ api }) => {
    const [students, setStudents] = useState([])
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${api}/students`)
            .then(res => {
                setStudents(res.data.data)
                setLoading(false)
            })
        // console.log(students);
        // eslint-disable-next-line
    }, [])

    const approveStudent = (std, index) => {
        // console.log(data);
        const filteredData = data.filter((item) => {
            return item.uniqKey === index
        })
        // console.log(filteredData[0].selectedBatch);
        axios.put(`${api}/students/${std.roll}`, {
            course: std.course,
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

            {
                loading ? <MSkeleton /> : <List>
                    {
                        students.map((std, index) => {
                            return !std.isClassAssign &&
                                <div key={index}>
                                    <ListItem disablePadding>
                                        <ListItemButton disableRipple >
                                            <Grid container spacing={1}
                                                // columns={{ xs: 12, sm: 12, md: 12 }}
                                                // textAlign={'center'}
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <Grid item xs={12} sm={4} md={6} lg={6} >
                                                    <ListItemText primary={`${std.name} applied for ${std.course} course`} />
                                                </Grid>
                                                {/* <Box> */}
                                                <Grid item xs={12} sm={6} md={4} lg={5} >
                                                    <UnApprovedList api={api} std={std} deLoad={setData} data={data} uniqKey={index} />
                                                </Grid>
                                                <Grid item xs={12} sm={2} md={2} lg={1} >
                                                    <Button fullWidth variant="contained" onClick={() => approveStudent(std, index)} >Approve</Button>
                                                </Grid>
                                            </Grid>
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider />
                                </div>
                        })
                    }
                </List>
            }
        </div >

    )
}

export default Dashboard