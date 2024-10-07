import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

export default function SideNav() {
    return (
        <Paper sx={{ width: 320, maxWidth: '100%'}}>
            <MenuList>
                <MenuItem>
                    <ListItemIcon>
                        <ListItemText>Dashboard</ListItemText>
                    </ListItemIcon>
                </MenuItem>
            </MenuList>
        </Paper>
    );
}