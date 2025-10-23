import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

export interface SidebarProps {}

export function Sidebar(props: SidebarProps) {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 360,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <List component="nav" aria-label="main mailbox folders">
        <ListItem disablePadding>
          {/* optional: dùng disablePadding khi dùng ListItemButton */}
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Students" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
