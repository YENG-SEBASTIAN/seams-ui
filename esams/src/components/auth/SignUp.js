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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';
import validation from './validations/Validation';
import { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress'; // Import LinearProgress

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

const defaultTheme = createTheme();

const USERNAME_REG = /^[a-zA-Z0-9]/;
const FULLNAME_REG = /^[a-zA-Z]/;
const EMAIL_REG = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
const PASSWORD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = ({ signup }) => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [fullName, setFullName] = useState('');
  const [validFullName, setValidFullName] = useState(false);
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [role, setRole] = useState('Student');
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [re_password, setRe_password] = useState('');
  const [validRe_password, setValidRe_password] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading indicator

  useEffect(() => {
    const result = USERNAME_REG.test(username);
    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = FULLNAME_REG.test(fullName);
    setValidFullName(result);
  }, [fullName]);

  useEffect(() => {
    const result = EMAIL_REG.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REG.test(password);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    const result = PASSWORD_REG.test(re_password);
    setValidRe_password(result);
  }, [re_password]);

  useEffect(() => {
    setErrors({});
  }, [username, fullName, email, password, re_password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { username, fullName, email, password, re_password };
    
    if (
      validUsername &&
      validFullName &&
      validEmail &&
      validPassword &&
      validRe_password
    ) {
      try {
        setLoading(true); // Start showing loading indicator
        await signup(username.toUpperCase(), fullName, email, role, password, re_password);
        navigate('/');
      } catch (error) {
        setErrors(validation(formData));
      } finally {
        setLoading(false); // Stop showing loading indicator
      }
    } else {
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  name="fullName"
                  autoComplete="fullName"
                  onChange={(e) => setFullName(e.target.value)}
                  helperText={errors.fullName}
                  error={errors.fullName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Index Number/Lecturer ID"
                  name="username"
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                  helperText={errors.username}
                  error={errors.username}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="role">Role</InputLabel>
                  <Select
                    labelId="role"
                    id="role"
                    label="Role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <MenuItem value='Student'>Student</MenuItem>
                    <MenuItem value='Lecturer'>Lecturer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
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
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  helperText={errors.password}
                  error={errors.password}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="re_password"
                  label="Confirm Password"
                  type="password"
                  id="re_password"
                  onChange={(e) => setRe_password(e.target.value)}
                  helperText={errors.re_password}
                  error={errors.re_password}
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
              {loading ? <LinearProgress /> : 'Sign Up'}{/* Show loading indicator when loading */}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(SignUp);
