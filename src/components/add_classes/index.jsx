import { useContext, useState } from 'react'
import readXlsxFile from 'read-excel-file'

import MTable from "../../ui-components/mtable";

import axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { GlobalContext } from '../../context/context';
import MModal from '../../ui-components/MModal';
import img from '../../assets/img/add-class-ss.png'


const columns = [
    { id: "teacher", label: "Teacher Name", minWidth: 170 },
    { id: "course", label: "Course", minWidth: 170 },
    { id: "batch", label: "Batch Number", minWidth: 170 },
    { id: "section", label: "Section", minWidth: 170 },
    { id: "classTiming", label: "Class Timing", minWidth: 170 },
    { id: "classSchedule", label: "class Schedule", minWidth: 170 },
];

const AddClasses = () => {
    const { state } = useContext(GlobalContext)
    const [data, setData] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await axios.post(`${state.api}/classes/add/bulk`, { data })
        console.log(result.data);
    };

    const fileHandler = (e) => {
        const file = e.target.files[0]
        const map = {
            'Teacher Name': 'teacher',
            'Course': 'course',
            'Batch No': 'batch',
            'Section': 'section',
            'Class Timing': 'classTiming',
            'Class Schedule': 'classSchedule'
        }
        readXlsxFile(file, { map }).then(({ rows }) => {
            setData(rows)
            console.log(rows);
        })
    }
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 2
        }}>
            <MModal img={img} /> 
            <Typography variant="h6">Add Classes</Typography>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "40ch" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Stack direction="row" alignItems="center" spacing={1}>
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

export default AddClasses