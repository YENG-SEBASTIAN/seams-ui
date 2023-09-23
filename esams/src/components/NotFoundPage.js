import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

const ResponsiveTableContainer = styled(TableContainer)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        overflowX: 'auto',
    },
}));

export default function NotFoundPage() {

    return (
            <Typography component="h1" variant="h5" sx={{ color: 'primary.dark', textAlign: 'center', paddingTop: 30 }}>
                Oooohh! Error!! 404 your requested page can not be found.
            </Typography>
    );
}
