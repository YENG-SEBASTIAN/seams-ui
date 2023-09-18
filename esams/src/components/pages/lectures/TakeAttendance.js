import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import { invigilator_add_courses } from './services/service';
import validation from '../../auth/validations/Validation';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TakeAttendace() {
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [courseCode, setCourseCode] = React.useState(2);
  const [courseName, setCourseName] = React.useState('');
  const [loading, setLoading] = React.useState(false); // Track loading state

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { courseCode, courseName };
    if (courseCode !== "" && courseName !== "") {
      setLoading(true); // Set loading to true when submitting
      await invigilator_add_courses(courseCode, courseName);
      setLoading(false); // Set loading back to false
      handleClose();
      return navigate("/esams/mark-attendance");
    } else {
      setErrors(validation(formData));
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Take Attendance
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Enter course details"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
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
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color='error'
            variant="contained"
            onClick={handleClose}
            disabled={loading} // Disable the button when loading
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            disabled={loading} // Disable the button when loading
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}{/* Show CircularProgress when loading */}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
