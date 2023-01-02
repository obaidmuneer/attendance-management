import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import ThemeSwitch from "../../themes/theme_switch"
const pages = [
  {
    path: "/home",
    title: "Home",
  },
  {
    path: "/add_class",
    title: "Add Class",
  }
];

const subPages = [
  {
    path: "/students",
    title: "All Students",
  },
  {
    path: "/student",
    title: "Student Info",
  },
  {
    path: "/add_student",
    title: "Add Student",
  },
  {
    path: "/",
    title: "Add Students",
  },
  {
    path: "/approve_students",
    title: "Approve Students",
  },
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNavSub, setAnchorElNavSub] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenNavSubMenu = (event) => {
    setAnchorElNavSub(event.currentTarget);
  };

  const handleCloseNavSubMenu = () => {
    setAnchorElNavSub(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={"/"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Attendance System
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
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
              <MenuItem onClick={handleOpenNavSubMenu}>Students</MenuItem>
              <Menu
                id="simple-menu"
                anchorEl={anchorElNavSub}
                keepMounted
                open={Boolean(anchorElNavSub)}
                onClose={handleCloseNavSubMenu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                {subPages.map((page, index) => (
                  <MenuItem key={index} onClick={handleCloseNavSubMenu}>
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
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to={"/"}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Attendance System
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Link
                key={index}
                to={page.path}
                style={{ textDecoration: "inherit" }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.title}
                </Button>
              </Link>
            ))}
            <Button
              onClick={handleClick}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Student
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {subPages.map((page, index) => (
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
          </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}

          <Box sx={{ flexGrow: 0 }}>
            <ThemeSwitch />
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
