// pages/HomePage.jsx
import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    return (
    <Container sx={{margin:2}}>
      <Typography variant="h4" gutterBottom>
        Welcome to Pangramea!
      </Typography>
      <Typography variant="body1">
        This is your home for improving typing skills through fun and engaging pangram challenges.
      </Typography>
      <Button color="primary" variant="contained" onClick={() => navigate('/gametest')}>Play</Button>
    </Container>
  );
};

export default HomePage;
