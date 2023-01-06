import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import MTextField from "../../ui-components/mtextfield";
import { GlobalContext } from "../../context/context";

const validationSchema = yup.object({
  name: yup
    .string("Enter Your Name")
    .required("Your name is required i.e Obaid Muneer"),
  fathername: yup
    .string("Enter Father Name")
    .required("Father name is required i.e Muneer Hussain"),
  contact: yup.string().required("Contact no is required i.e +923133853852"),
  section: yup
    .string()
    .required("Section is required i.e Select A, B"),
});

const StudentProfile = () => {
  const { state, dispatch } = useContext(GlobalContext)
  const [claxx, setClaxx] = useState([])
  const { studentRoll } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: state?.student?.name,
      fathername: state?.student?.fathername,
      contact: state?.student?.contact,
      section: state?.student?.class.section,
    },
    validationSchema,
    onSubmit: (values, actions) => {
      console.log("Submitted", values);
      handleSubmit();
    },
  });

  const handleSubmit = async () => {
    const result = await axios.put(`${state.api}/students/profile/${state.student.roll}`, {
      ...formik.values,
      course: state.student?.class.course,
      batch: state.student?.class.batch
    });
    navigate(-1)
  };

  useEffect(() => {
    axios.get(`${state.api}/classes/${state.student?.class.course}/${state.student?.class.batch}`)
      .then(res => setClaxx(res.data.data))
  }, [])


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        encType="multipart/form-data"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "40ch" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // alignItems: "center",
        }}
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <MTextField
          str={"name"}
          placeHelper="Enter Student's Name"
          formik={formik}
        />
        <MTextField
          str={"fathername"}
          placeHelper="Enter Father Name"
          formik={formik}
        />
        <MTextField
          str={"contact"}
          placeHelper="Enter Phone no i.e 031212345678"
          formik={formik}
          type={"number"}
        />
        {/* {"course should be a list to be fethced from server"} */}

        <Stack>
          <FormControl
            sx={{
              width: '40ch',
            }}
            error={formik.touched.section && Boolean(formik.errors.section)}
          >
            <InputLabel id="section">Select Section</InputLabel>
            <Select
              name="section"
              labelId="section"
              id="section"
              value={formik.values.section}
              label="Select Section"
              onChange={formik.handleChange}
            >
              <MenuItem value={state?.student?.class.section}>{state?.student?.class.section}</MenuItem>
              {
                claxx.map((item, index) => {
                  return item.section !== state?.student?.class.section && <MenuItem key={index} value={item.section}>{item.section}</MenuItem>
                })
              }

            </Select>
            <FormHelperText>
              {formik.touched.course && formik.errors.course}
            </FormHelperText>
          </FormControl>

        </Stack>
        <Button
          color="primary"
          sx={{ justifyContent: "center", mt: 1 }}
          variant="contained"
          type="submit"
        >
          Update Student Info
        </Button>
      </Box>
    </div>
  );
};

export default StudentProfile;
