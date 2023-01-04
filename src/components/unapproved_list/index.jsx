import { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import AsyncSelect from "../../ui-components/async_select"
import SelectSection from "../select_section"
import axios from "axios";

const UnApprovedList = ({ api, std, deLoad, data, uniqKey }) => {
    const [classes, setClasses] = useState([])
    const [selectedBatch, setSelectedBatch] = useState('')
    const [section, setSection] = useState('')

    const handleSectionChange = (e) => {
        // console.log(e.target.value);
        setSection(e.target.value)
        deLoad(
            [...data, {
                selectedBatch,
                selectedSec: e.target.value,
                uniqKey
            }]
        )
    }

    useEffect(() => {
        axios.get(`${api}/classes/${std.course}`)
            .then(res => {
                // console.log(res.data.data);
                setClasses(res.data.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Box sx={{ minWidth: 300, display: "flex", justifyContent: "center", m: 1 }} >
            <AsyncSelect selectData={setSelectedBatch} lists={classes} label="Select Batch No" />
            {
                (std?.course.toLowerCase() === classes[0]?.course.toLowerCase()) &&
                selectedBatch &&
                <SelectSection classData={classes} selectedBatch={selectedBatch} label="Select Section" handleChange={handleSectionChange} handleValue={section} />
            }
        </Box>

    )
}

export default UnApprovedList