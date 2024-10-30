// Header.jsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Tooltip,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FireIcon from '@mui/icons-material/LocalFireDepartment';

const Header = ({ streak }) => {
  const navigate = useNavigate();

  // Assume October has 31 days
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const playedDays = Array.from({ length: streak }, () => true);
  const days = [...playedDays, ...Array(31 - streak).fill(false)];

  return (
    <AppBar position="static" className='header'>
      <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Placeholder Title
        </Typography>

        {/* Progress Bar Container */}
        <Tooltip title="Visit my Progress Metrics">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: 1,
              padding: 1,
              cursor: 'pointer',
              bgcolor: 'background.paper',
              border: '1px solid #ccc',
              borderRadius: 1,
              mx: 2,
            }}
            onClick={() => navigate('/myprofile/1')} // Change "1" to the user's actual ID
          >
            {/* Progress Bar */}
            <Box
              sx={{
                display: 'flex',
                flexGrow: 1,
                height: 20,
                width: '100%', // Ensures it takes full width
              }}
            >
              {days.map((played, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: 1,
                    height: '100%',
                    backgroundColor: played ? 'green' : 'lightgray',
                    transition: 'background-color 0.3s',
                    borderRight: index < days.length - 1 ? '1px solid #ccc' : 'none',
                  }}
                />
              ))}
            </Box>
            <Typography variant="body2" sx={{ paddingLeft: 1 }}>
              Visit my Progress Metrics
            </Typography>
          </Box>
        </Tooltip>

        {/* Streak Display */}
        <Tooltip title="Strengthen My Streak">
          <IconButton
            onClick={() => navigate('/pangramea')}
            sx={{ marginLeft: 2 }}
          >
            <FireIcon />
            <Typography variant="body1" sx={{ marginLeft: 0.5 }}>
              {streak}
            </Typography>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

