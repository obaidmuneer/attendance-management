import * as React from 'react';
import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import Menu from "@mui/material/Menu";
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";

export default function MMenu({ title, pages, nav, closeMenu }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        nav && closeMenu();
    };

    return (
        <Stack >
            {
                nav ?
                    <MenuItem onClick={handleOpenMenu}>{title}</MenuItem>
                    :
                    <Button
                        onClick={handleOpenMenu}
                        sx={{ my: 2, color: "white", display: "block" }}
                    >
                        {title}
                    </Button>
            }
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}

                anchorOrigin={{
                    vertical: nav ? 'top':'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: nav ? 'left' : 'center',
                }}

            >
                {pages.map((page, index) => (
                    <MenuItem key={index} onClick={handleCloseMenu}>
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
        </Stack>
    );
}