import './App.css';
import { Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/AppBar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Activate from './components/auth/Activate';
import ResetPassword from './components/auth/ResetPassword';
import ResetPasswordConfirm from './components/auth/ResetPasswordConfirm';
import StudentDashboard from './components/pages/students/StudentDashboard';
import RegisterCourses from './components/pages/students/RegisterCourses';
import Attendance from './components/pages/students/Attendance';
import Profile from './components/pages/students/Profile';
import LecturerDashboard from './components/pages/lectures/LecturerDashboard';
import Album from './components/Album';
import { AuthProvider } from './components/context/AuthContext';
import StudentRequired from './components/context/StudentRequired';

function App() {
  return (
    <>
      <AuthProvider>
        <ResponsiveAppBar />
        <Routes>
          {/* public routes */}
          <Route path='/' exact element={<SignIn />} />
          <Route path='/SignUp' exact element={<SignUp />} />
          <Route path='/activate/:uid/:token' exact element={<Activate />} />
          <Route path='/reset-password' exact element={<ResetPassword />} />
          <Route path='password/reset/confirm/:uid/:token' exact element={<ResetPasswordConfirm />} />


          {/* protected routes */}

          {/* student components */}
          <Route path='/dashboard' exact element={ <StudentRequired> <StudentDashboard /> </StudentRequired> } />
          <Route path='/register-courses' exact element={<StudentRequired> <RegisterCourses /> </StudentRequired>} />
          <Route path='/attendance' exact element={<StudentRequired> <Attendance /> </StudentRequired>} />
          <Route path='/profile' exact element={<StudentRequired> <Profile /> </StudentRequired>} />


          <Route path='/LecturerDashboard' exact element={<LecturerDashboard />} />
          
          <Route path='/Album' exact element={<Album />} />

        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
