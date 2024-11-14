// pages/HomePage.jsx
import React from 'react';
import { Typography, Container, CardContent, Card, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    return (
    <Container sx={{margin:2}}>
      <Typography variant="h4" gutterBottom>
        Welcome to Pangramea!
      </Typography>
      <Container sx={{margin:2, display:'flex',flexDirection:"row", flexWrap:"wrap" }}>
        <Card sx={{ maxWidth: 345, margin:1 }}>
            <CardActionArea onClick={() => navigate('/pangramea')}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Pangramea Classic
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Improve your typing skills through fun and engaging pangram challenges.
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 345, margin:1 }}>
            <CardActionArea onClick={() => navigate('/pangramea')}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Pangramea 2.0
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Improve your typing skills through fun and engaging pangram challenges.
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
      </Container>
    </Container>
  );
};

export default HomePage;
