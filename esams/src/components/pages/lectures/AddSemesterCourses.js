
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { add_lecturer_semester_courses } from './services/service';
import validation from '../../auth/validations/Validation';
import { useNavigate } from 'react-router-dom';


const defaultTheme = createTheme();

export default function AddSemesterCourses() {

  const navigate = useNavigate();
  const [errors, setErrors] = React.useState({});
  const [level, setLevel] = React.useState('');
  const [className, setClassName] = React.useState('');
  const [courseCode, setCourseCode] = React.useState(2);
  const [courseName, setCourseName] = React.useState('');
  const [creditHours, setCreditHours] = React.useState('');


  React.useEffect(() => {
    setErrors({})
  }, [courseName])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { level, className, courseCode, courseName, creditHours };
    if (level !== "" && className !== "" && courseCode !== "" && courseName !== "" && creditHours !== "") {
      await add_lecturer_semester_courses(level, className, courseCode, courseName, creditHours);
      return navigate("/esams/home")
    } else {
      setErrors(validation(formData));
    }

  }

  return (
    <React.Fragment>
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

            <Typography component="h1" variant="h5" sx={{ color: 'primary.dark', textAlign: 'center', padding: 2 }}>
              Add semester courses
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>


              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="className"
                  label="Class Name"
                  id="className"
                  onChange={(e) => setClassName(e.target.value)}
                />
              </Grid>

              <TextField
                margin="normal"
                required
                fullWidth
                name="courseName"
                label="Course Name"
                id="courseName"
                onChange={(e) => setCourseName(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="courseCode"
                label="Course Code"
                id="courseCode"
                onChange={(e) => setCourseCode(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="creditHours"
                label="Credit Hours"
                id="creditHours"
                type='number'
                onChange={(e) => setCreditHours(e.target.value)}
              />

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="level">Level</InputLabel>
                  <Select
                    labelId="level"
                    id="level"
                    value={level}
                    label="Level"
                    onChange={(e) => setLevel(e.target.value)}
                  >
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={200}>200</MenuItem>
                    <MenuItem value={300}>300</MenuItem>
                    <MenuItem value={400}>400</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                add course
              </Button>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
