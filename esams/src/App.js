import './App.css';
import { Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/AppBar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Activate from './components/auth/Activate';
import ResetPassword from './components/auth/ResetPassword';
import ResetPasswordConfirm from './components/auth/ResetPasswordConfirm';
import Layout from './components/Layout';
import { AuthProvider } from './components/context/AuthContext';

function App() {
  return (
    <>
      <AuthProvider>
        {
          localStorage.getItem('userRole') ? <ResponsiveAppBar /> : ''
        }
        
        <Routes>
          {/* public routes */}
          <Route path='/' exact element={<SignIn />} />
          <Route path='/SignUp' exact element={<SignUp />} />
          <Route path='/activate/:uid/:token' exact element={<Activate />} />
          <Route path='/reset-password' exact element={<ResetPassword />} />
          <Route path='password/reset/confirm/:uid/:token' exact element={<ResetPasswordConfirm />} />

          {/* protected routes */}
          <Route path='/esams/*' exact element={<Layout />} />

        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
