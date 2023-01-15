import { useEffect, useState, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom"
import axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import MCard from "../../ui-components/mcard";
import MPopover from "../../ui-components/mpopover";
import { GlobalContext } from "../../context/context";

const Student = () => {
  const { state, dispatch } = useContext(GlobalContext)
  const [roll, setRoll] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(window.location.pathname.split('/')[2]);
    axios
      .get(`${state.api}/students/${roll}`)
      .then((res) => {
        setStudent(res.data.student);
        dispatch({
          type: "student",
          payload: res.data.student
        })
        // navigate(`attendance/${roll}`)
      })
      .catch((err) => {
        console.error(err.response.data.message);
        setError(err.response.data.message)
        dispatch({
          type: "student",
          payload: null
        })
      });
    navigate(`attendance/${roll}`)

    console.log(student);
  };


  useEffect(() => {
    document.querySelector('#standard-number').focus()
  }, [])

  return (
    <div>
      <Grid container spacing={2}
        justifyContent="space-around"
        alignItems="center"
        mt={1}
      >
        <Grid item xs={'auto'} >
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
              display: "flex",
              alignItems: "center",
              mr: 1,
            }}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              id="standard-number"
              label="Please enter a roll number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              onChange={(e) => setRoll(+e.target.value)}
              value={roll}
            />
            <Button type="submit" variant="contained" size="medium">
              Submit
            </Button>
          </Box>
        </Grid>

        {(state.student) ?
          <Grid item xs={'auto'}>
            <Link to={`profile/${state.student?.roll}`} style={{ textDecoration: "inherit" }}>
              <MPopover msg={"Click to Update"} >
                <MCard student={state.student} />
              </MPopover>
            </Link>
          </Grid>
          : error}
      </Grid>
      <Outlet />
    </div>
  )
}

export default Student