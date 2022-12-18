import { useState } from 'react'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function SelectSection({ classData, selectedBatch, deLoad, data, uniqKey }) {
    const [section, setSection] = useState('')

    const handleChange = (e) => {
        setSection(e.target.value)
        deLoad(
            [...data, {
                selectedBatch,
                selectedSec: section,
                uniqKey
            }]
        )
    }

    return (
        <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="section-select-label">Select Section</InputLabel>
            <Select
                labelId="section-select-label"
                id="section-select"
                value={section}
                label="Select Section"
                onChange={handleChange}
            >
                {
                    classData.map((eachClass, index) => {
                        return eachClass.batch === selectedBatch &&
                            <MenuItem key={index} value={eachClass.section}>{eachClass.section}</MenuItem>
                    })
                }

            </Select>
        </FormControl>
    );
}