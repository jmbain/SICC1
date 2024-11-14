// pages/UserProfilePage.jsx
import React, { useState } from 'react';
import { Typography, Container, Card, CardContent, Grid, Box, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

const UserProfilePage = () => {
  const { id } = useParams(); // Get the user ID from the URL params

  // Fake data
  const [gameLog, setGameLog] = useState([
    { time: 45.23, accuracy: 98.5, wpm: 75, date: '2024-11-01' },
    { time: 55.67, accuracy: 96.2, wpm: 70, date: '2024-10-20' },
    { time: 40.12, accuracy: 99.1, wpm: 80, date: '2024-09-15' },
  ]);

  // Aggregated all-time stats
  const [allTimeStats, setAllTimeStats] = useState({
    totalTime: gameLog.reduce((acc, game) => acc + game.time, 0),
    avgAccuracy: (gameLog.reduce((acc, game) => acc + game.accuracy, 0) / gameLog.length).toFixed(2),
    avgWPM: (gameLog.reduce((acc, game) => acc + game.wpm, 0) / gameLog.length).toFixed(2),
  });

  // Data for the data explorer
  const [monthlyData, setMonthlyData] = useState({
    '2024-11': { time: 45.23, accuracy: 98.5, wpm: 75 },
    '2024-10': { time: 55.67, accuracy: 96.2, wpm: 70 },
    '2024-09': { time: 40.12, accuracy: 99.1, wpm: 80 },
  });

  // Function to handle filtering by month
  const handleMonthChange = (month) => {
    const data = monthlyData[month];
    alert(`Data for ${month}:\nTime: ${data.time}s\nAccuracy: ${data.accuracy}%\nWPM: ${data.wpm}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Profile: {id}
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to your profile page! Here you can view your game history, stats, and explore your performance over time.
      </Typography>

      {/* All-Time Stats Section */}
      <Box mb={5}>
        <Typography variant="h5" gutterBottom>
          All-Time Stats
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Time Played: {allTimeStats.totalTime.toFixed(2)}s</Typography>
            <Typography>Average Accuracy: {allTimeStats.avgAccuracy}%</Typography>
            <Typography>Average WPM: {allTimeStats.avgWPM}</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Game Log and Data Explorer Sections */}
      <Grid container spacing={3}>
        {/* Game Log Section */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom>
            Game Log
          </Typography>
          <Grid container spacing={3}>
            {gameLog.map((game, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Game Date: {game.date}</Typography>
                    <Typography>Time: {game.time}s</Typography>
                    <Typography>Accuracy: {game.accuracy}%</Typography>
                    <Typography>WPM: {game.wpm}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Data Explorer Section */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom>
            Data Explorer
          </Typography>
          <Grid container spacing={2}>
            {Object.keys(monthlyData).map((month) => (
              <Grid item xs={12} sm={4} key={month}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{month}</Typography>
                    <Button variant="contained" onClick={() => handleMonthChange(month)}>
                      View Data
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfilePage;
