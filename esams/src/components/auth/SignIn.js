import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, load_user, checkAuthenticated } from '../../actions/auth';
import { useState, useEffect } from 'react';
import validation from './validations/Validation';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
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

const EMAIL_REG = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
const PASSWORD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignIn = ({ login, load_user, checkAuthenticated }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State for showing loading indicator
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState(false);

  
  useEffect(() => {
    const result = EMAIL_REG.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REG.test(password);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    setErrors({});
  }, [email, password]);

  useEffect(() => {
    // Check if the user is already authenticated and has an access token
    const accessToken = localStorage.getItem('access');

    if (checkAuthenticated && accessToken && localStorage.getItem('userRole') === 'Student') {
      // User is authenticated, redirect to the dashboard
      navigate('/esams/dashboard', { replace: true });
    } else if (checkAuthenticated && accessToken && localStorage.getItem('userRole') === 'Lecturer') {
      // User is authenticated, redirect to the dashboard
      navigate('/esams/home', { replace: true });
    } else {
      // User is not authenticated, load user data if needed
      load_user();
    }
  }, [checkAuthenticated, load_user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { email, password };

    if (validEmail && validPassword) {
      try {
        setLoading(true);
        await login(email, password);
        await auth.load_user();
        if (localStorage.getItem('userRole') === 'Student') {
          setAlertMessage('Login successful! Redirecting...');
          setAlertColor('green'); // Set the color to green for success
          setShowAlert(true);
          setTimeout(() => {
            navigate('/esams/dashboard', { replace: true });
            window.location.reload();
          }, 2000); // Redirect after 3 seconds
        } else if (localStorage.getItem('userRole') === 'Lecturer') {
          setAlertMessage('Login successful! Redirecting...');
          setAlertColor('green'); // Set the color to green for success
          setShowAlert(true);
          setTimeout(() => {
            navigate('/esams/home', { replace: true });
            window.location.reload();
          }, 2000); // Redirect after 3 seconds
        }else{
          setAlertMessage('Login failed. Please check your credentials.');
          setAlertColor('red'); // Set the color to red for error
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 2000); 
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrors(validation(formData));
        setAlertMessage('Login failed. Please check your credentials.');
        setAlertColor('red'); // Set the color to red for error
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000); // Hide the alert after 3 seconds
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Invalid email or password");
      setErrors(validation(formData));
    }
  };



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Smart E-Attendance
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          {/* Display the alert message with color based on alertColor */}
          {showAlert && (
            <h5 style={{ marginBottom: '1rem', color: alertColor }}>{alertMessage}</h5>
          )}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  helperText={errors.email}
                  error={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  helperText={errors.password}
                  error={errors.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading} // Disable the button when loading
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}{/* Show loading indicator when loading */}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/reset-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, load_user, checkAuthenticated })(SignIn);
