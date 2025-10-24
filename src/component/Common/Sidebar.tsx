import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

export interface SidebarProps {}

export function Sidebar(props: SidebarProps) {
  const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: 'none',
    color: 'inherit',
    '&.active .MuiListItemButton-root': {
      backgroundColor: theme.palette.action.selected,
    },
  }));
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 360,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <List component="nav" aria-label="main mailbox folders">
        <StyledNavLink to="/admin/dashboard">
          <ListItem disablePadding>
            {/* optional: dùng disablePadding khi dùng ListItemButton */}
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </StyledNavLink>
        <StyledNavLink to="/admin/students">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Students" />
            </ListItemButton>
          </ListItem>
        </StyledNavLink>
      </List>
    </Box>
  );
}
