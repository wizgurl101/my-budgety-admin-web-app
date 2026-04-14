'use client';
import NavBar from '@/components/Navbar/page';
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  ButtonGroup,
} from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ width: '100%' }}>
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
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          My Budgety Dailies
        </Typography>
        <ButtonGroup>
          <Button href="/dashboard">Go to Dashboard</Button>
          <Button>In Progress</Button>
        </ButtonGroup>
      </Container>
    </Box>
  );
}
