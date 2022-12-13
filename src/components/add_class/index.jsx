import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import ModifiedTextField from "../textfield";
import Box from "@mui/material/Box";

const validationSchema = yup.object({
  teacher: yup
    .string("Enter Teacher Name")
    .required("Teacher's name is required i.e Inzimam Malik"),
  course: yup
    .string("Enter Course Name")
    .min(3)
    .required("Course name is required i.e WEB, Graphic"),
  batch: yup.string().required("Batch no is required i.e 1, 2"),
  section: yup.string().required("Section name is required i.e A, B"),
  classTiming: yup
    .string()
    .required("Class timing is required i.e 9pm to 10pm , 9:00pm to 10:00pm"),
  classSchedule: yup
    .string()
    .required("Section name is required i.e MWF , TTS , Weekdays"),
});

const AddClass = ({ api }) => {
  const formik = useFormik({
    initialValues: {
      teacher: "",
      course: "",
      batch: "",
      section: "",
      classTiming: "",
      classSchedule: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Submitted", values);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // just checking i can also do it this way lol
    let { teacher, classTiming, classSchedule, section, course, batch } =
      e.target;
    let data = {
      teacher: teacher.value,
      classTiming: classTiming.value,
      classSchedule: classSchedule.value,
      section: section.value,
      course: course.value,
      batch: batch.value,
    };

    axios
      .post(`${api}/add_class`, data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: 'center',
        alignItems: "center",
      }}
    >
      <h3>Add Class</h3>
      {/* <form onSubmit={handleSubmit}>
        <span>Teacher :</span>
        <input type="text" name="teacher" /> <br />
        <span>Class Timing :</span>
        <input type="text" name="classTiming" /> <br />
        <span>Class Schedule :</span>
        <input type="text" name="classSchedule" />
        <br />
        <span>Section :</span>
        <input type="text" name="section" />
        <br />
        <span>Course :</span>
        <input type="text" name="course" />
        <br />
        <span>Batch :</span>
        <input type="text" name="batch" />
        <br />
        <input type="submit" value="Submit" />
      </form> */}

      <div>
        {/* <form onSubmit={formik.handleSubmit}> */}
        <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {  width: "40ch" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // alignItems: "center",
        }}
        // noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
          <ModifiedTextField str={"teacher"} formik={formik} />
          <br />
          <ModifiedTextField str={"course"} formik={formik} />
          <br />
          <ModifiedTextField str={"batch"} formik={formik} />
          <br />
          <ModifiedTextField str={"section"} formik={formik} />
          <br />
          <ModifiedTextField str={"classTiming"} formik={formik} />
          <br />
          <ModifiedTextField str={"classSchedule"} formik={formik} />
          <br />
          <Button
            color="primary"
            sx={{ justifyContent: "center" }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
          </Box>
        {/* </form> */}
      </div>
    </div>
  );
};

export default AddClass;
