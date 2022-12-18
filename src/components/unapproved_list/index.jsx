import { useState } from "react"
import Box from '@mui/material/Box';
import AsyncSelectBatch from "../async_select_batch"
import SelectSection from "../select_section"
import Stack from "@mui/material/Stack";


const UnApprovedList = ({ api, std, deLoad, data, uniqKey }) => {
    const [classData, setClassData] = useState([])
    const [selectedBatch, setSelectedBatch] = useState('')

    return (
        <Box sx={{ minWidth: 300, mr:1 }} >
            <Stack spacing={1} direction="row">
                <AsyncSelectBatch selectbatch={setSelectedBatch} selectClass={setClassData} std={std} api={api} />
                {
                    (std.course.toLowerCase() === classData[0]?.course.toLowerCase()) &&
                    selectedBatch &&
                    <SelectSection classData={classData} selectedBatch={selectedBatch} data={data} uniqKey={uniqKey} deLoad={deLoad} />
                }
            </Stack>
        </Box>

    )
}

export default UnApprovedList