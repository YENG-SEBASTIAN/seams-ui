

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
import axios from 'axios';
import { LECTURERS_API_BASE_URL } from '../../../actions/types';
import DownloadModal from './DownloadModal';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress

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

  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // Add loading state

  const load_invigilated_courses = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${localStorage.getItem("access")}`,
        "accept": "application/json"
      }
    };
    await axios.get(LECTURERS_API_BASE_URL + `invigilatorGetCourse/`, config)
      .then((res) => {
        setCourses(res.data)
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading:', error);
        setLoading(false); // Set loading to false on error
      });
  };

  React.useEffect(() => {
    load_invigilated_courses();
  }, [])

  return (
    <ResponsiveTableContainer component={Paper}>
      <Typography component="h1" variant="h5" sx={{ color: 'primary.dark', textAlign: 'center', padding: 2 }}>
      Invigilated courses
        </Typography>
      {/* Show CircularProgress while loading */}
      {loading ? (
        <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
      ) : (
        <Table aria-label="customized table">
          <TableHead sx={{ backgroundColor: 'primary.dark' }}>
            <TableRow>
              <StyledTableCell>Course Code</StyledTableCell>
              <StyledTableCell>Course Name</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell>{row.courseCode}</StyledTableCell>
                <StyledTableCell>{row.courseName}</StyledTableCell>
                <StyledTableCell>
                <DownloadModal courseCode={row.courseCode} courseName={row.courseName}/>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </ResponsiveTableContainer>
  );
}
