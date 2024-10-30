import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import Header from './components/Header';

function App() {
  const [count, setCount] = useState(0)
  
  const userStreak = 12; //Later this will come from state

  return (
    <>
      <CssBaseline />
      <Header streak={userStreak} />
      <Outlet /> {/* Renders the matched child route */}
    </>
  )
}

export default App
