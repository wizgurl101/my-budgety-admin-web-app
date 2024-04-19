import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
export default function NavBar() : React.JSX.Element {
    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: '#3F3F44'
                }}
        >
        <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
            }}
        >
            MY BUDGETY
        </Typography>
    </AppBar>
    );
}