import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ExcleMediaCard from '../excle-card';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function MModal({ img, givenWidth, label }) {
    const [open, setOpen] = useState(false);

    const handleModal = () => setOpen(!open);

    useEffect(() => {
        // console.log(localStorage.getItem(label));
        if (localStorage.getItem(label)) {
            return setOpen(false)
        }
        setOpen(true)
    }, [])

    const handleHideModal = () => {
        localStorage.setItem(label, false)
        setOpen(false)
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            How to Upload File
                        </Typography>
                        <IconButton onClick={handleModal}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>

                    {/* <Typography id="modal-modal-description">
                        Your Excel file should be as shown below
                    </Typography> */}
                    <ExcleMediaCard img={img} givenWidth={givenWidth} handle={handleHideModal} />

                </Box>
            </Modal>
        </div>
    );
}