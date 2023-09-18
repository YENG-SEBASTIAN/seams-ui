import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';


const studentPages = ['Dashboard', 'Register-Courses', 'Attendance'];
const lecturerPages = ['home', 'Add-courses', 'Reports'];
const settings = ['Profile', 'Logout'];


function ResponsiveAppBar({ logout }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

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

  const log_out = async () => {
    await logout();
    localStorage.removeItem('userRole');
    return window.location.href = "/";
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SEAMS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {
                localStorage.getItem('userRole') === 'Student' ? (
                  studentPages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography sx={{ textDecoration: 'none' }} textAlign="center" component={Link} to={`/esams/${page.toLowerCase()}`}>
                        {page}
                      </Typography>
                    </MenuItem>
                  ))
                ) : localStorage.getItem('userRole') === 'Lecturer' ? (
                  lecturerPages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography sx={{ textDecoration: 'none' }} textAlign="center" component={Link} to={`/esams/${page.toLowerCase()}`}>
                        {page}
                      </Typography>
                    </MenuItem>
                  ))
                ) : ''
              }

            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SEAMS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {
              localStorage.getItem('userRole') === 'Student' ? (studentPages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  component={Link}
                  to={`/esams/${page.toLowerCase()}`}
                >
                  {page}
                </Button>
              ))) : localStorage.getItem('userRole') === 'Lecturer' ? (lecturerPages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  component={Link}
                  to={`/esams/${page.toLowerCase()}`}
                >
                  {page}
                </Button>
              ))) : ''
            }
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {
                localStorage.getItem('userRole') === 'Lecturer' ? (
                  settings.length > 1 && (
                    <>
                      <MenuItem key={settings[1]} onClick={log_out}>
                        <Typography sx={{ textDecoration: 'none' }} textAlign="center">
                          {settings[1]}
                        </Typography>
                      </MenuItem>
                    </>
                  )
                ) : localStorage.getItem('userRole') === 'Student' ? (
                  settings.length > 1 && (
                    <>
                      <MenuItem key={settings[0]}>
                        <Typography sx={{ textDecoration: 'none' }} textAlign="center" component={Link} to={`/esams/${settings[0].toLowerCase()}`}>
                          {settings[0]}
                        </Typography>
                      </MenuItem>
                      <MenuItem key={settings[1]} onClick={log_out}>
                        <Typography sx={{ textDecoration: 'none' }} textAlign="center">
                          {settings[1]}
                        </Typography>
                      </MenuItem>
                    </>
                  )
                ) : ''
              }

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default connect(null, { logout })(ResponsiveAppBar);
