import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import moment from "moment/moment";

import MTextField from "../../ui-components/mtextfield";

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
    onSubmit: (values, actions) => {
      // console.log("Submitted", values);
      const time = values.classTiming;
      const sepTime = time.indexOf("to");
      const startTime = moment(time.slice(0, sepTime - 1), "h a");
      const endTime = moment(time.slice(sepTime + 2), "h a");
      console.log(sepTime, startTime, endTime);
      // console.log(startTime.format('hh:mm:a'));
      // console.log(endTime.format('hh:mm:a'));
      console.log(formik.touched.classTiming);
      if (sepTime > -1 && startTime.isValid() && endTime.isValid()) {
        console.log("working");
        handleSubmit();
        actions.resetForm({
          values: {
            teacher: "",
            batch: formik.values.batch,
            course: formik.values.course,
            section: "",
            classTiming: "",
            classSchedule: formik.values.classSchedule,
          },
        });
      } else {
        actions.setFieldError("classTiming", "Invalid Timing");
      }
    },
  });
  const handleSubmit = async () => {
    try {
      let { teacher, classTiming, classSchedule, section, course, batch } =
        formik.values;
      let data = {
        teacher,
        classTiming,
        classSchedule,
        section,
        course,
        batch,
      };
      const result = await axios.post(`${api}/classes`, data);
      console.log(result.data);
    } catch (error) {
      console.log(error.message);
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
      <h3>Add Class</h3>
      <div>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "40ch" },
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
            str={"teacher"}
            placeHelper={"Enter Teacher's Name"}
            formik={formik}
          />
          <br />
          <MTextField
            str={"course"}
            placeHelper={"Enter Course Name i.e WEB"}
            formik={formik}
          />
          <br />
          <MTextField
            str={"batch"}
            placeHelper={"Enter Batch no i.e 2, 3"}
            formik={formik}
          />
          <br />
          <MTextField
            str={"section"}
            placeHelper={"Enter Section Name i.e A, B"}
            formik={formik}
          />
          <br />
          <MTextField
            str={"classTiming"}
            placeHelper={"9pm to 10pm or 9:00PM to 10:00PM"}
            formik={formik}
          />
          <br />
          <MTextField
            str={"classSchedule"}
            placeHelper={"Classes Day i.e MWF , TTS , Sunday"}
            formik={formik}
          />
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
      </div>
    </div>
  );
};

export default AddClass;
