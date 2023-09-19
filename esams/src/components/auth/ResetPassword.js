import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import validation from './validations/Validation';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { password_reset } from '../../actions/auth';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress

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

const EMAIL_REG = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;

const ResetPassword = ({ password_reset }) => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [requestSent, setRequestSent] = useState(false);

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading indicator

  useEffect(() => {
    const result = EMAIL_REG.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrors({});
  }, [email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { email };
    setSuccessMsg('');
    setErrorMsg('');

    if (validEmail === true) {
      try {
        setLoading(true); // Start showing loading indicator
        await password_reset(email);
        setRequestSent(true);
        setSuccessMsg('Password reset email sent successfully. Please check your email');
        setTimeout(() => {
          setSuccessMsg(''); // Clear the success message after 2 seconds
          navigate('/'); // Redirect after 2 seconds
        }, 2000);
      } catch (error) {
        setErrorMsg('Error sending password reset email. Please try again.');
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
            Reset Password
          </Typography>
            {/* Display the success or error message with appropriate color */}
            {successMsg && (
              <h4 style={{ color: 'green', textAlign: 'center' }}>
                {successMsg}
              </h4>
            )}
            {errorMsg && (
              <h4 style={{ color: 'red', textAlign: 'center' }}>
                {errorMsg}
              </h4>
            )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              helperText={errors.email}
              error={errors.email}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading} // Disable the button when loading
            >
              {loading ? <CircularProgress size={24} /> : 'Reset Password'}{/* Show loading indicator when loading */}
            </Button>
          
            <Grid container justifyContent="flex-end">
              <Grid item xs>
                <Link href="/" variant="body2">
                  Go back
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default connect(null, { password_reset })(ResetPassword);
