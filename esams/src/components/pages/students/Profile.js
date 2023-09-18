import * as React from 'react';
import { useEffect, useState } from 'react';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { USERS_API_BASE_URL, REACT_API_BASE_URL } from '../../../actions/types';
import axios from 'axios';
import styled from '@emotion/styled';
import SetStudentProfile from './SetStudentProfile';
import UpdateProfile from './UpdateProfile';

const defaultTheme = createTheme();

const Item = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

export default function Profile() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const isMobile = useMediaQuery(defaultTheme.breakpoints.down('sm'));

  useEffect(() => {
    const userInfo = async () => {
      try {
        const response = await axios.get(USERS_API_BASE_URL + 'getUser/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('access')}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    const userProfile = async () => {
      try {
        const response = await axios.get(USERS_API_BASE_URL + 'getProfile/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('access')}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    userInfo();
    userProfile();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Grid container spacing={2} direction={isMobile ? 'column' : 'row'}>
          <Grid item xs={12} sm={6}>
            <CardMedia
              component="img"
              image={REACT_API_BASE_URL + profile.picture}
              alt={user.fullName}
              height={isMobile ? 200 : 300}
              width={isMobile ? 200 : 400}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Item>
              <h4>ID: {user.username}</h4>
              <h4>Role: {user.role}</h4>
              <h4>Name: {user.fullName}</h4>
              <h4>Program: {profile.programme}</h4>
              <h4>Level: {profile.level}</h4>
              <h4>Contact: {profile.contact}</h4>
              <h4>Email: {user.email}</h4>
              <h4>About: {profile.about}</h4>
            </Item>
            {profile.length === 0 ? (
              <>
                <SetStudentProfile />
              </>
            ) : (
              <>
                <UpdateProfile />
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
