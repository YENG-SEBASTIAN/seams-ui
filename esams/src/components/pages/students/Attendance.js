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
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import axios from 'axios';
import { STUDENTS_API_BASE_URL } from '../../../actions/types';

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

export default function Attendance() {

  const [attendance, setAttendance] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // Add loading state

  const loadStudentAttendance = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${localStorage.getItem("access")}`,
        "accept": "application/json"
      }
    };
    try {
      const response = await axios.get(STUDENTS_API_BASE_URL + `getAttendance/`, config);
      setAttendance(response.data);
      setLoading(false); // Set loading to false after data is loaded
    } catch (error) {
      console.error('Error loading student attendance:', error);
      setLoading(false); // Set loading to false on error
    }
  };

  React.useEffect(() => {
    loadStudentAttendance();
  }, []);

  return (
    <ResponsiveTableContainer component={Paper}>
      <Typography component="h1" variant="h5" sx={{ color: 'primary.dark', textAlign: 'center', padding: 2 }}>
        Attendance
      </Typography>
      {loading ? ( // Render CircularProgress when loading is true
        <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
      ) : (
        <Table aria-label="customized table">
          <TableHead sx={{ backgroundColor: 'primary.dark' }}>
            <TableRow>
              <StyledTableCell>Index Number</StyledTableCell>
              <StyledTableCell>Course Code</StyledTableCell>
              <StyledTableCell>Course Name</StyledTableCell>
              <StyledTableCell>Date & Time</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.indexNumber}
                </StyledTableCell>
                <StyledTableCell>{row.courseCode}</StyledTableCell>
                <StyledTableCell>{row.courseName}</StyledTableCell>
                <StyledTableCell>{new Date(row.attendance).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell>{row.isPresent ? 'Present' : 'Absent'}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </ResponsiveTableContainer>
  );
}
