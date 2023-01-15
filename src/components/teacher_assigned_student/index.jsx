import { useState } from 'react';
import axios from 'axios';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import MCard from '../../ui-components/mcard';
import MTable from '../../ui-components/mtable';
import MPopover from '../../ui-components/mpopover';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const columns = [
    { id: "name", label: "Name", minWidth: 120 },
    { id: "fathername", label: "Father Name", minWidth: 120 },
    { id: "roll", label: "Roll Number", minWidth: 120 },
    { id: "contact", label: "Phone no", minWidth: 120 },
    { id: "course", label: "Course", minWidth: 120 },
];

export default function TeacherAssignedStudent({ api, claxx }) {
    const [students, setStudents] = useState([]);
    const [open, setOpen] = useState(false);
    const targetElement = document.querySelector('#card')
    console.log(targetElement);

    const handleOpen = () => {
        setOpen(true)
        axios.get(`${api}/students/class/${claxx._id}`)
            .then(res => setStudents(res.data.students))
            .catch(err => console.log(err))
        disableBodyScroll(targetElement);
    }

    const handleClose = () => {
        setOpen(false)
        enableBodyScroll(targetElement)
    };


    return (
        <div>
            <div id='card' >
                <MPopover msg={"Click to Show Student"} >
                    <MCard claxx={claxx} handle={handleOpen} />
                </MPopover>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Teacher's Assigned Student
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>

                    {
                        students?.length > 0 ? <MTable data={students} columns={columns} height={'80vh'} /> :
                            <Typography id="modal-modal-description">
                                No Students Found
                            </Typography>
                    }

                </Box>
            </Modal>
        </div>
    );
}