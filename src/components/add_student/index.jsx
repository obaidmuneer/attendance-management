import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import ModifiedTextField from "../textfield";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const validationSchema = yup.object({
  name: yup
    .string("Enter Your Name")
    .required("Your name is required i.e Obaid Muneer"),
  fathername: yup
    .string("Enter Father Name")
    .required("Father name is required i.e Muneer Hussain"),
  contact: yup.string().required("Contact no is required i.e +923133853852"),
  cnic: yup.string().required("CNIC no is required i.e 98754-59887654-5"),
  course: yup.string().required("Course name is required i.e WEB, AI-Chatbot"),
});

const AddStudent = ({ api }) => {
  const [name, setName] = useState("");
  const [fathername, setFathername] = useState("");
  const [contact, setContact] = useState("");
  const [cnic, setCnic] = useState("");
  const [course, setCourse] = useState("");
  const [image, setImage] = useState({ preview: "", data: "" });

  const formik = useFormik({
    initialValues: {
      name: "",
      fathername: "",
      contact: "",
      cnic: "",
      course: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Submitted", values);
    },
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("pic", image.data);
    // console.log(formData);

    const result = await axios.post(`${api}/students`, {
      name,
      fathername,
      contact,
      cnic,
      course, //make the list to be fethced from server
    });
    console.log(result.data.data.roll);

    axios
      .post(`${api}/students/img/${result.data.data.roll}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    navigate("/");
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
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
      {/* <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <span>Name :</span> <input type="text" onChange={(e) => setName(e.target.value)} value={name} /> <br />
                <span>Father Name :</span> <input type="text" onChange={(e) => setFathername(e.target.value)} value={fathername} /> <br />
                <span>Contact No:</span> <input type="number" onChange={(e) => setContact(+e.target.value)} value={contact} /> <br />
                <span>Cnic: </span><input type="number" onChange={(e) => setCnic(e.target.value)} value={cnic} /> <br />
                <span>Course :</span>
                <select defaultValue={"course"} onChange={(e) => setCourse(e.target.value)}>
                    <option value="course" disabled >Select Course</option>
                    <option value="chatbot">Chatbot</option>
                    <option value="web">WEB</option>
                    <option value="graphic">Graphic</option>
                </select> <br />
                <input type="file" name="pic" onChange={handleFileChange} />
                <input type="submit" value="Add Student" />
            </form> */}
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
        <ModifiedTextField str={"name"} formik={formik} />
        <ModifiedTextField str={"fathername"} formik={formik} />
        <ModifiedTextField str={"contact"} formik={formik} />
        <ModifiedTextField str={"cnic"} formik={formik} />
        <ModifiedTextField str={"course"} formik={formik} />
        {/* {"course should be a list to be fethced from server"} */}
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
  );
};

export default AddStudent;
