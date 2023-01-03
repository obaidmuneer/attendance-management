import * as React from 'react';
import { Link } from "react-router-dom";

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';


export default function MMenuV2({ title, pages, nav, closeMenu }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        nav && closeMenu();
    };
    return (
        <React.Fragment>
            <Box>
                {
                    nav ?
                        <MenuItem onClick={handleClick}>{title}</MenuItem>
                        :
                        <Tooltip title={`${title} options`}>
                            <Button
                                onClick={handleClick}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {title}
                            </Button>
                        </Tooltip>
                }
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}      >
                {pages.map((page, index) => (
                    <MenuItem key={index} onClick={handleClose}>
                        <Typography textAlign="center">
                            <Link
                                style={{ textDecoration: "inherit", color: "inherit" }}
                                to={page.path}
                            >
                                {page.title}
                            </Link>
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    );
}