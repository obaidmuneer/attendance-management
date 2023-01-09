import { useState, useContext, useEffect } from 'react'
import readXlsxFile from 'read-excel-file'

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
import MTable from "../../ui-components/mtable";
import { GlobalContext } from '../../context/context';
import AsyncSelect from '../../ui-components/async_select';
import MModal from '../../ui-components/MModal';
import img from '../../assets/img/add-students-ss.png'

const validationSchema = yup.object({
    batch: yup
        .number("Enter Batch Number")
        .required("Batch Number is required i.e 1 , 2"),
    section: yup
        .string("Enter Section Name")
        .required("Section name is required i.e A, B"),
    // course: yup
    //     .string()
    //     .required("Course name is required i.e Select WEB, AI-Chatbot"),
});

const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "fathername", label: "Father Name", minWidth: 170 },
    { id: "roll", label: "Roll Number", minWidth: 170 },
    { id: "contact", label: "Phone Number", minWidth: 170 },
    { id: "course", label: "Course", minWidth: 170 },
    // { id: "picture", label: "Photo", minWidth: 170 },
];

const AddStudents = () => {
    const { state } = useContext(GlobalContext)
    const [data, setData] = useState([])
    const [lists, setLists] = useState([])
    const [course, setCourse] = useState('')
    const [isCard, setIsCard] = useState(true)

    useEffect(() => {
        axios.get(`${state.api}/classes`).then(res => {
            setLists(res.data.data)
            // console.log(res.data.data);
        })
    }, [])

    const formik = useFormik({
        initialValues: {
            batch: "",
            section: "",
            // course: "",
        },
        validationSchema,
        onSubmit: (values, actions) => {
            console.log("Submitted", values);
            handleSubmit();
            actions.resetForm({
                values: {
                    batch: formik.values.batch,
                    section: formik.values.section,
                    // course: formik.values.course,
                }
            });
        },
    });

    const handleSubmit = async () => {
        const { batch, section } = formik.values;
        // // console.log(data);
        const result = await axios.post(`${state.api}/students/add/bulk`, {
            batch,
            section,
            course,
            data
        })
        console.log(result.data);
    };

    const fileHandler = (e) => {
        const file = e.target.files[0]
        const map = {
            'Name': 'name',
            'Father Name': 'fathername',
            'Roll No': 'roll',
            'Contact No': 'contact',
            'CNIC': 'cnic',
            'Course': 'course'
        }
        readXlsxFile(file, { map }).then(({ rows }) => {
            setData(rows)
            console.log(rows);
        })
    }
    return (
        <Box >
            <Box
                component="form"
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
                <MModal img={img} />
                
                <Typography variant="h6">Add Bulk of Students</Typography>

                <AsyncSelect lists={lists} selectData={setCourse} label="Select Course" />

                <MTextField
                    str={"batch"}
                    placeHelper="Enter Batch Number"
                    formik={formik}
                />
                <MTextField
                    str={"section"}
                    placeHelper="Enter Section Name"
                    formik={formik}
                />

                <Stack direction="row" alignItems="center" spacing={1}>
                    {/* <FormControl
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
                    </FormControl> */}


                    <Button variant="contained" component="label">
                        Upload Xlsx File
                        <input
                            // id="pic"
                            // name="pic"
                            type="file"
                            hidden
                            onChange={fileHandler}
                        />
                    </Button>
                    <Button
                        color="primary"
                        sx={{ justifyContent: "center", mt: 1 }}
                        variant="contained"
                        type="submit"
                    >
                        Submit
                    </Button>
                </Stack>

            </Box>
            <div>
                {
                    data.length ? <MTable data={data} columns={columns} height={'80vh'} /> : null
                }
            </div>
        </Box>
    )
}

export default AddStudents