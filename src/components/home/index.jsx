import { useEffect, useState, useContext } from "react"
import axios from "axios";

import Box from '@mui/material/Box';
import Carousel from 'react-material-ui-carousel'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'

import Dashboard from "../dasboard"
import MCard from '../../ui-components/mcard';
import MSkeletonCard from "../../ui-components/mskeletoncard";
import { GlobalContext } from "../../context/context";
import Claxxex from "../claxxex";


const Home = () => {
    const { state } = useContext(GlobalContext);
    const [topStudents, setTopStudents] = useState([]);
    const [checkStudents, setCheckStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${state.api}/attendance/top_std`)
            .then(res => {
                setTopStudents(res.data.topStudents)
                setCheckStudents(res.data.checkStudents)
                setLoading(false)
                // console.log(res.data)
            })
        // eslint-disable-next-line
    }, [])

    const loginHandler = () => {
        console.log('hi');
    }

    return (
        <div>
            {/* <form onSubmit={loginHandler} >
                <input type="number" value={77673} />
                <input type="text" value={56789} />
                <button type="submit" >Click me</button>
            </form> */}
            <Dashboard api={state.api} />


            {loading ? <MSkeletonCard arrLength={2} /> : <Box sx={{ flexGrow: 1 }} >
                <Grid container
                    spacing={2}
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center" >
                    <Grid item xs={'auto'} >
                        {topStudents.length > 0 && <Typography variant='h5'> Top Students by Attendance</Typography>}
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
            </Box>}

            <Claxxex />

        </div >
    )
}

export default Home