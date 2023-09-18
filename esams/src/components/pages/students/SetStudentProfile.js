
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
import axios from 'axios';
import { USERS_API_BASE_URL } from '../../../actions/types';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SetStudentProfile() {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false); // Loading state

    const initialFormData = Object.freeze({
        programme: '',
        level: '',
        about: '',
        contact: '',
        picture: ''
    });

    const [formInput, setFormInput] = React.useState(initialFormData);
    const [picture, setPicture] = React.useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormInput({
            ...formInput,
            [name]: value
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true during form submission

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `JWT ${localStorage.getItem("access")}`,
            }
        };

        const userData = {
            programme: formInput.programme,
            level: formInput.level,
            about: formInput.about,
            contact: formInput.contact,
            picture: picture[0]
        };

        await axios.post(USERS_API_BASE_URL + `SetProfileInfo/`, userData, config)
            .then(res => {
                setLoading(false); // Set loading to false after form submission
                setOpen(false); // Close the dialog
                window.location.reload(); // Refresh the page
            })
            .catch(err => {
                setLoading(false); // Set loading to false on error
                console.log(err);
            });
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Set Profile
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
                            name="programme"
                            label="Programe of study"
                            id="programme"
                            onChange={handleChange}

                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="level"
                            label="Level"
                            id="level"
                            onChange={handleChange}

                        />


                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="about"
                            label="About"
                            multiline
                            id="about"
                            onChange={handleChange}

                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="contact"
                            label="Mobile Number"
                            id="contact"
                            onChange={handleChange}

                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="picture"
                            label="Upload a picture with your full face"
                            id="picture"
                            type='file'
                            onChange={(e) => setPicture(e.target.files)}

                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color='error'
                        variant="contained"
                        onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading} // Disable the button when loading
                    >
                        {loading ? <CircularProgress size={24} /> : 'Submit'}{/* Show loading indicator when loading */}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
