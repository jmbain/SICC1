// pages/UserProfilePage.jsx
import React from 'react';
import { Typography, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

const UserProfilePage = () => {
  const { id } = useParams(); // Get the user ID from the URL params

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Profile: {id}
      </Typography>
      <Typography variant="body1">
        This is the profile page for user {id}. Here you can view your stats and history.
      </Typography>
      {/* User stats and history will be displayed here */}
    </Container>
  );
};

export default UserProfilePage;
