import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function SelectSection({ classData, selectedBatch, label, handleChange, handleValue }) {

    return (
        <FormControl sx={{ minWidth: 150, ml: 1 }}>
            <InputLabel id="section-select-label">{label}</InputLabel>
            <Select
                labelId="section-select-label"
                id="section-select"
                value={handleValue}
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