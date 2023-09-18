import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import StudentDashboard from './pages/students/StudentDashboard';
import RegisterCourses from './pages/students/RegisterCourses';
import Attendance from './pages/students/Attendance';
import Profile from './pages/students/Profile';
import StudentRequired from './context/StudentRequired';
import UpdateCourse from './pages/students/UpdateCourse';
import { Routes, Route } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        seams.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Layout() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <Routes>
              {/* protected routes */}

              {/* student components  */}
              <Route path='/dashboard' exact element={<StudentRequired> <StudentDashboard /> </StudentRequired>} />
              <Route path='/register-courses' exact element={<StudentRequired> <RegisterCourses /> </StudentRequired>} />
              <Route path='/updateCourse/:id' exact element={<StudentRequired> <UpdateCourse /> </StudentRequired>} />

              <Route path='/attendance' exact element={<StudentRequired> <Attendance /> </StudentRequired>} />
              <Route path='/profile' exact element={<StudentRequired> <Profile /> </StudentRequired>} />

            </Routes>
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          SEAMS
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          A Smart Examination Attendance Management System using face recognition
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}