import { useEffect, useState } from "react"
import axios from "axios";

import Carousel from 'react-material-ui-carousel'
import Stack from "@mui/material/Stack";
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
                                return <MCard key={student.roll} student={student} />
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
                                return <MCard key={student.roll} student={student} />
                            })
                        }
                    </Carousel>
                </div>
            </Stack>
        </div>
    )
}

export default Home