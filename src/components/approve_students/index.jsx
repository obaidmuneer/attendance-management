import { useState, useEffect, useContext } from 'react'
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
import AsyncSelect from '../../ui-components/async_select';
import SelectSection from '../select_section';
import { GlobalContext } from '../../context/context';

const validationSchema = yup.object({
    batch: yup
        .number("Enter Batch Number")
        .required("Batch Number is required i.e 1 , 2"),
    section: yup
        .string("Enter Section Name")
        .required("Section name is required i.e A, B"),
    course: yup
        .string()
        .required("Course name is required i.e Select WEB, AI-Chatbot"),
});


const ApproveStudents = () => {
    const { state } = useContext(GlobalContext)
    const [data, setData] = useState([])
    const [lists, setLists] = useState([])
    const [course, setCourse] = useState('')
    const [batches, setBatches] = useState([])
    const [selectedBatch, setSelectedBatch] = useState('')
    const [section, setSection] = useState('')

    const handleSectionChange = (e) => {
        // console.log(e.target.value);
        setSection(e.target.value)
    }

    const formik = useFormik({
        initialValues: {
            batch: "",
            section: "",
            course: "",
        },
        validationSchema,
        onSubmit: (values, actions) => {
            console.log("Submitted", values);
            handleSubmit();
            actions.resetForm({
                values: {
                    batch: formik.values.batch,
                    section: "",
                    course: formik.values.course,
                }
            });
        },
    });

    const handleSubmit = async () => {
        const { batch, section, course } = formik.values;
        // console.log(data);
        const result = await axios.put(`${state.api}/students/approve/bulk`, {
            batch,
            section,
            course,
            rolls: data
        })
        console.log(result.data);
    };

    const fileHandler = (e) => {
        const file = e.target.files[0]
        const map = {
            'Roll No': 'roll',
        }
        readXlsxFile(file, { map }).then(({ rows }) => {
            rows.map(row => setData(oldArray => [...oldArray, row.roll]))
            console.log(data);
        })
    }

    useEffect(() => {
        axios.get(`${state.api}/classes`).then(res => {
            setLists(res.data.data)
            // console.log(res.data.data);
        })
    }, [])

    const getBatch = () => {
        axios.get(`${state.api}/classes/${course}`)
            .then(res => {
                console.log(res.data.data);
                setBatches(res.data.data)
            })
            .catch(err => console.log(err))
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 2
        }}>
            <Typography variant="h6">Approve Bulk of Students</Typography>
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
                        Upload Xlsx File
                        <input
                            id="pic"
                            name="pic"
                            type="file"
                            hidden
                            onChange={fileHandler}
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
            {/* <AsyncSelect lists={lists} selectData={setCourse} label="Select Course" flag={true} callback={getBatch} />
            {
                course && <AsyncSelect lists={batches} selectData={setSelectedBatch} label="Select Batch No" />
            }
            {
                (course.toLowerCase() === batches[0]?.course.toLowerCase()) &&
                selectedBatch &&
                <SelectSection classData={batches} selectedBatch={selectedBatch} label="Select Section" handleChange={handleSectionChange} handleValue={section} />
            } */}

        </Box>
    )
}

export default ApproveStudents