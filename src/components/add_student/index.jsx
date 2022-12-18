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

const validationSchema = yup.object({
  name: yup
    .string("Enter Your Name")
    .required("Your name is required i.e Obaid Muneer"),
  fathername: yup
    .string("Enter Father Name")
    .required("Father name is required i.e Muneer Hussain"),
  contact: yup.string().required("Contact no is required i.e +923133853852"),
  cnic: yup.string().required("CNIC no is required i.e 98754-59887654-5"),
  course: yup
    .string()
    .required("Course name is required i.e Select WEB, AI-Chatbot"),
  pic: yup.mixed(),
});

const AddStudent = ({ api }) => {

  const formik = useFormik({
    initialValues: {
      name: "",
      fathername: "",
      contact: "",
      cnic: "",
      course: "",
      pic: null,
    },
    validationSchema,
    onSubmit: (values, actions) => {
      console.log("Submitted", values);
      handleSubmit();
      actions.resetForm({
        values: {
          name: "",
          fathername: "",
          contact: "",
          cnic: "",
          course: formik.values.course,
          pic: null,
        }
      });
    },
  });

  const handleSubmit = async () => {
    const { name, fathername, contact, cnic, course, pic } = formik.values;
    console.log(Boolean(pic));

    const result = await axios.post(`${api}/students`, {
      name,
      fathername,
      contact,
      cnic,
      course,
    });
    console.log(result.data.data.roll);

    if (Boolean(pic)) {
      let formData = new FormData();
      formData.append("pic", pic);
      // console.log(formData);

      const imgResult = await axios.post(
        `${api}/students/img/${result.data.data.roll}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(imgResult.data);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Add Student</Typography>
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
        // noValidate
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
        <MTextField
          str={"cnic"}
          placeHelper={"Enter CNIC no xxxxx-xxxxxxx-x"}
          formik={formik}
          type={"number"}
        />

        {/* {"course should be a list to be fethced from server"} */}

        <Stack direction="row" alignItems="center" spacing={4}>
          <FormControl

            sx={{ width: "20ch" }}
            error={formik.touched.course && Boolean(formik.errors.course)}
          >
            <InputLabel id="course">Select Course</InputLabel>
            <Select
              name="course"
              labelId="course"
              id="course"
              value={formik.values.course}
              label="Select Course"
              onChange={formik.handleChange}
            >
              <MenuItem value={"web"}>Web</MenuItem>
              <MenuItem value={"graphic"}>Graphic</MenuItem>
              <MenuItem value={"ai-chatbot"}>AI Chatbot</MenuItem>
            </Select>
            <FormHelperText>
              {formik.touched.course && formik.errors.course}
            </FormHelperText>
          </FormControl>

          <Button variant="contained" component="label">
            Upload Image
            <input
              id="pic"
              name="pic"
              type="file"
              hidden
              onChange={(event) => {
                formik.setFieldValue("pic", event.currentTarget.files[0]);
              }}
            />
          </Button>
        </Stack>
        <Button
          color="primary"
          sx={{ justifyContent: "center", mt: 1 }}
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default AddStudent;
