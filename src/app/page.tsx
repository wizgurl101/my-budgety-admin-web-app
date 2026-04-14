'use client';
import NavBar from '@/components/Navbar/page';
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  ButtonGroup,
  Divider,
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
          height: '45vh',
          backgroundColor: '#F7F7F7',
          gap: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          My Budgety Daily
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Points: 0
        </Typography>
        <ButtonGroup>
          <Button href="/dashboard">Go to Dashboard</Button>
          <Button>In Progress</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button href="/dashboard/uploadBudget">Update Expanse</Button>
          <Button>In Progress</Button>
        </ButtonGroup>
        <Divider sx={{ width: '100%', marginY: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Rewards
        </Typography>
      </Container>
    </Box>
  );
}
