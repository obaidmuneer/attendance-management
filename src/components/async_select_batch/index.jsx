import * as React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

export default function AsyncSelectBatch({ api, std, selectbatch, selectClass }) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        if (!loading) {
            return undefined;
        }
        getClass(std);

        // eslint-disable-next-line
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const getClass = (std) => {
        axios.get(`${api}/get_class/${std.course}`)
            .then(res => {
                selectClass(res.data.data)
                uniq(res.data.data)
            })
            .catch(err => console.log(err))
    }

    const uniq = (data) => {
        const a = data.map((item) => {
            return item.batch
        })
        const uniqArr = [...new Set(a)];
        setOptions(uniqArr)
    }

    return (
        <Autocomplete
            id="select-course"
            sx={{ width: 170 }}
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
            onChange={(e) => selectbatch(e.target.textContent)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Select Batch No"
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
