import React from 'react';
import { Button, TextField, Container, Typography} from '@mui/material';
export default function Home() {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#fff',
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    color: 'black'
                }}
            >
                MY BUDGETY
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
            />
            <Button
                variant="contained"
                color="primary"
            >
                SIGN IN
            </Button>
        </Container>
    );
}
