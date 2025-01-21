'use client'

import * as React from 'react';
import Link from 'next/link';

import Drawer from '@mui/material/Drawer';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItem from "@mui/material/ListItem";

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
                    <ListItem component={Link} href={"/dashboard"}>
                        <ListItemText>
                            Dashboard
                        </ListItemText>
                    </ListItem>
                </MenuItem>
                <MenuItem>
                    <ListItem component={Link} href={"/dashboard/uploadBudget"}>
                        <ListItemText>
                            Upload & Budget Management
                        </ListItemText>
                    </ListItem>
                </MenuItem>
                <MenuItem>
                    <ListItem component={Link} href={"/dashboard/category"}>
                        <ListItemText>
                            Category Management
                        </ListItemText>
                    </ListItem>
                </MenuItem>
                <MenuItem>
                    <ListItem component={Link} href={"/dashboard/keyword"}>
                        <ListItemText>
                            Category Keywords Management
                        </ListItemText>
                    </ListItem>
                </MenuItem>
            </MenuList>
        </Drawer>
    );
}