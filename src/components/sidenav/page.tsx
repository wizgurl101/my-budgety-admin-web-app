'use client'

import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

export interface SideNavProps {
    onClose?: () => void;
    open?: boolean;
}

export default function SideNav({ onClose, open }: SideNavProps): React.ReactElement {
    return (
        <Drawer
            sx={{ width: 320, maxWidth: '100%'}}
            onClose={onClose}
            open={open}
        >
            <MenuList>
                <MenuItem>
                    <ListItemIcon>
                        <ListItemText>Dashboard</ListItemText>
                    </ListItemIcon>
                </MenuItem>
            </MenuList>
        </Drawer>
    );
}