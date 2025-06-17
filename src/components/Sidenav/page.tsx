'use client';

import * as React from 'react';
import Link from 'next/link';

import Drawer from '@mui/material/Drawer';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import StarIcon from '@mui/icons-material/Star';

export interface SideNavProps {
  onClose?: () => void;
  open?: boolean;
}

export default function SideNav({
  onClose,
  open,
}: SideNavProps): React.ReactElement {
  return (
    <Drawer sx={{ width: 320, maxWidth: '100%' }} onClose={onClose} open={open}>
      <MenuList>
        <Stack direction="row" spacing={0}>
          <AnalyticsIcon sx={{ fontSize: 40, paddingTop: 1, paddingLeft: 3 }} />
          <Typography
            variant="h6"
            sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 1 }}
          >
            Analyics
          </Typography>
        </Stack>
        <Divider />
        <MenuItem>
          <ListItem component={Link} href={'/dashboard'}>
            <ListItemText>Dashboard</ListItemText>
          </ListItem>
        </MenuItem>
        <MenuItem>
          <ListItem component={Link} href={'/dashboard/expanse'}>
            <ListItemText>Month Expanses</ListItemText>
          </ListItem>
        </MenuItem>
        <Stack direction="row" spacing={0}>
          <SettingsIcon sx={{ fontSize: 40, paddingTop: 1, paddingLeft: 3 }} />
          <Typography
            variant="h6"
            sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 1 }}
          >
            Admin
          </Typography>
        </Stack>
        <Divider />
        <MenuItem>
          <ListItem component={Link} href={'/dashboard/uploadBudget'}>
            <ListItemText>Upload Csv to Expanses</ListItemText>
          </ListItem>
        </MenuItem>
        <MenuItem>
          <ListItem component={Link} href={'/dashboard/category'}>
            <ListItemText>Category Management</ListItemText>
          </ListItem>
        </MenuItem>
        <MenuItem>
          <ListItem component={Link} href={'/dashboard/keyword'}>
            <ListItemText>Category Keywords Management</ListItemText>
          </ListItem>
        </MenuItem>
        <MenuItem>
          <ListItem component={Link} href={'/dashboard/subcategory'}>
            <ListItemText>Sub-Category Management</ListItemText>
          </ListItem>
        </MenuItem>
        <Stack direction="row" spacing={0}>
          <StarIcon sx={{ fontSize: 40, paddingTop: 1, paddingLeft: 3 }} />
          <Typography
            variant="h6"
            sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 1 }}
          >
            Tools
          </Typography>
        </Stack>
        <Divider />
        <MenuItem>
          <ListItem component={Link} href={'/dashboard/ladsCalculator'}>
            <ListItemText>LaDS Banner Calculator</ListItemText>
          </ListItem>
        </MenuItem>
      </MenuList>
    </Drawer>
  );
}
