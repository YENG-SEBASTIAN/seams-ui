import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
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
import LecturerRequired from './context/LecturerRequired';
import UpdateCourse from './pages/students/UpdateCourse';

import LecturerDashboard from './pages/lectures/LecturerDashboard';
import AddSemesterCourses from './pages/lectures/AddSemesterCourses';
import TakeAttendance from './pages/lectures/TakeAttendance';
import Report from './pages/lectures/Report';
import MarkAttendance from './pages/lectures/MarkAttendance';
import UpdateSemesterCourses from './pages/lectures/UpdateSemesterCourses';

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

              {/* lecturer components */}
              <Route path='/home' exact element={<LecturerRequired> <LecturerDashboard /> </LecturerRequired> } />
              <Route path='/add-courses' exact element={<LecturerRequired> <AddSemesterCourses /> </LecturerRequired> } />
              <Route path='/take-attendance' exact element={<LecturerRequired> <TakeAttendance /> </LecturerRequired> } />
              <Route path='/reports' exact element={<LecturerRequired> <Report /> </LecturerRequired> } />
              <Route path='/mark-attendance' exact element={<LecturerRequired> <MarkAttendance /> </LecturerRequired> } />
              <Route path='/updateLceturerCourse/:id' exact element={<LecturerRequired> <UpdateSemesterCourses /> </LecturerRequired> } />

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