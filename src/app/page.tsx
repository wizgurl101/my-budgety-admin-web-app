import React from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import NavBar from '@/components/Navbar/page';
export default function Home() {
  return (
    <>
      <NavBar />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#F7F7F7',
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: '#97C67C',
            mb: 6,
          }}
        >
          MY BUDGETY
        </Typography>
        <TextField
          required
          label="Email"
          variant="outlined"
          sx={{
            width: '40%',
          }}
        />
        <TextField
          required
          label="Password"
          type="password"
          variant="outlined"
          sx={{
            width: '40%',
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: '40%',
          }}
        >
          SIGN IN
        </Button>
      </Container>
    </>
  );
}
