'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);
  return (
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
          color: 'black',
          mb: 6,
        }}
      >
        Redirecting to dashboard...
      </Typography>
    </Container>
  );
}
