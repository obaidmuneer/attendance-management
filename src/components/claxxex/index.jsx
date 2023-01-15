import { useEffect, useState, useContext } from "react"
import axios from "axios";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'

import MSkeletonCard from "../../ui-components/mskeletoncard";
import TeacherAssignedStudent from "../teacher_assigned_student";

import { GlobalContext } from "../../context/context";

const Claxxex = () => {
    const { state } = useContext(GlobalContext);
    const [loadingClaxx, setLoadingClaxx] = useState(true);
    const [claxxex, setClaxxex] = useState([]);

    useEffect(() => {
        axios.get(`${state.api}/classes`).then(res => {
            // console.log(res.data.data)
            setClaxxex(res.data.data)
            setLoadingClaxx(false)
        })
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            {loadingClaxx ? <>
                <MSkeletonCard arrLength={3} claxx={true} />
                <MSkeletonCard arrLength={3} claxx={true} />
            </> : <Box sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                my: 2
            }} >
                <Typography variant="h5" >Classes</Typography>
                <Grid container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center" >
                    {
                        claxxex.map((claxx, index) => {
                            return <Grid xs={'auto'} sm={'auto'} md={'auto'} item key={index}>
                                <TeacherAssignedStudent api={state.api} claxx={claxx} />
                            </Grid>
                        })
                    }
                </Grid>
            </Box>}
        </div>
    )
}

export default Claxxex