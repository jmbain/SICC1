// pages/HomePage.jsx
import React from 'react';
import { Typography, Container } from '@mui/material';

const HomePage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to Pangramea!
      </Typography>
      <Typography variant="body1">
        This is your home for improving typing skills through fun and engaging pangram challenges.
      </Typography>
    </Container>
  );
};

export default HomePage;
