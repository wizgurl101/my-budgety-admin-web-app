import * as React from 'react';
import NavBar from '@/components/navbar/page';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
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
        {children}
      </Container>
    </Box>
  );
}
