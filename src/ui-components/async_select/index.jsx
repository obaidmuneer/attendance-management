import { useState, useEffect } from 'react'

import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

export default function AsyncSelect({ selectData, lists, label, flag, callback }) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        if (!loading) {
            return undefined;
        }
        uniq(lists)
        // eslint-disable-next-line
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const uniq = (data) => {
        const a = data.map((item) => {
            return label === 'Select Course' ? item.course : item.batch
        })
        const uniqArr = [...new Set(a)];
        setOptions(uniqArr)
    }

    return (
        <Autocomplete
            id="select-course"
            sx={{ minWidth: 120 }}
            open={open}
            onOpen={() => {
                setOpen(true)
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option === value}
            getOptionLabel={(option) => option}
            options={options}
            loading={loading}
            onChange={(e) => {
                selectData(e.target.textContent)
            }}
            onSelect={() => flag && callback()}

            // onSele
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
}
