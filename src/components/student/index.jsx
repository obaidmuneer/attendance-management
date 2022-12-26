import { useEffect, useState, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom"

import axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import MCard from "../../ui-components/mcard";
import Grid from "@mui/material/Grid";
import { GlobalContext } from "../../context/context";

const Student = ({ api }) => {
  const [roll, setRoll] = useState("");
  const [student, setStudent] = useState(null);
  const navigate = useNavigate()
  const { state, dispatch } = useContext(GlobalContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`${api}/students/${roll}`)
      .then((res) => {
        setStudent(res.data.student);
        dispatch({
          type: "student",
          payload: res.data.student
        })
        navigate(`attendance/${roll}`)
      })
      .catch((err) => {
        console.error(err);
      });
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

        {student && student.isClassAssign && (
          <Grid item xs={'auto'}>
            <Link to={`profile/${student.roll}`} >
              <MCard student={student} />
            </Link>
          </Grid>
        )}
      </Grid>
      <Outlet />
    </div>
  )
}

export default Student