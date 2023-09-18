import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { DeleteForeverRounded, EditAttributesRounded } from '@mui/icons-material';
import axios from 'axios';
import { LECTURERS_API_BASE_URL } from '../../../actions/types';
import { delete_lecturer_course } from './services/service';
import { useNavigate, Link } from 'react-router-dom';
import TakeAttendace from './TakeAttendance';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ResponsiveTableContainer = styled(TableContainer)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    overflowX: 'auto',
  },
}));

export default function LecturerDashboard() {

  const navigate = useNavigate();

  const [courses, setCourses] = React.useState([]);

  const load_lecturer_courses = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
        accept: 'application/json',
      },
    };
    await axios.get(LECTURERS_API_BASE_URL + 'lecturerGetSemesterCourse/', config)
      .then((res) => setCourses(res.data))
      .catch((error) => {
        console.error('Error loading lecturer courses:', error);
      });
  };

  React.useEffect(() => {
    load_lecturer_courses();
  }, []);

  const delete_course = async (id) => {
    try {
      await delete_lecturer_course(id);
      window.location.reload();
      navigate('/esams/home');
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <ResponsiveTableContainer component={Paper}>
      <Typography component="h1" variant="h5" sx={{ color: 'primary.dark', textAlign: 'center', padding: 2 }}>
        Semester Courses
        </Typography>
      <Table aria-label="customized table">
        <TableHead sx={{ backgroundColor: 'primary.dark' }}>
          <TableRow>
            <StyledTableCell>Class Name</StyledTableCell>
            <StyledTableCell>Course Name</StyledTableCell>
            <StyledTableCell>Course Code</StyledTableCell>
            <StyledTableCell>Level</StyledTableCell>
            <StyledTableCell>Credit Hours</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.className}
              </StyledTableCell>
              <StyledTableCell>{row.courseName}</StyledTableCell>
              <StyledTableCell>{row.courseCode}</StyledTableCell>
              <StyledTableCell>{row.level}</StyledTableCell>
              <StyledTableCell>{row.creditHours}</StyledTableCell>
              <StyledTableCell>
                <Link to={`/esams/updateLecturerCourse/${row.id}`}>
                  <EditAttributesRounded color='primary' />
                </Link>
                <DeleteForeverRounded sx={{ cursor: 'pointer' }} onClick={() => delete_course(row.id)} color='error' />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TakeAttendace />
    </ResponsiveTableContainer>
  );
}
