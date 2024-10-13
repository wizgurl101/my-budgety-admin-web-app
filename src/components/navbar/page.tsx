'use client'

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SideNav from "@/components/sidenav/page";

export default function NavBar() : React.JSX.Element {
    const [openSideNav, setOpenSideNav] = React.useState<boolean>(false);

    const setSideNav = (): void => {
        setOpenSideNav(false);
    }

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: '#3F3F44'
                    }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => {
                            setOpenSideNav(true);
                        }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        MY BUDGETY
                    </Typography>
                </Toolbar>
            </AppBar>
            <SideNav
                onClose={setSideNav}
                open={openSideNav}
            />
        </>
    );
}