import { useEffect, useState } from "react"
import axios from "axios";

import Box from '@mui/material/Box';
import Carousel from 'react-material-ui-carousel'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'

import Dashboard from "../dasboard"
import MCard from '../../ui-components/mcard';



const Home = ({ api }) => {
    const [topStudents, setTopStudents] = useState([])
    const [checkStudents, setCheckStudents] = useState([])


    useEffect(() => {
        axios.post(`${api}/top_check_std`)
            .then(res => {
                setTopStudents(res.data.topStudents)
                setCheckStudents(res.data.checkStudents)
            })
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <Dashboard api={api} />

            <Box sx={{ flexGrow: 1 }} >
                <Grid container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center" >
                    <Grid item xs={'auto'} >
                        {topStudents.length > 0  && <Typography variant='h5'> Top Students by Attendance</Typography>}
                        <Carousel
                            indicators={false}
                            height={150}
                        >
                            {
                                topStudents.map(student => {
                                    return <MCard key={student.roll} student={student} />
                                })
                            }
                        </Carousel>
                    </Grid>


                    <Grid item xs={'auto'} >
                        {checkStudents.length > 0 && <Typography variant='h5'> Attension needed Students</Typography>}
                        <Carousel
                            indicators={false}
                            height={150}
                        >
                            {
                                checkStudents.map(student => {
                                    return <MCard key={student.roll} student={student} />
                                })
                            }
                        </Carousel>
                    </Grid>
                </Grid>
            </Box>
        </div >
    )
}

export default Home