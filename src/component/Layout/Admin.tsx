import { Box } from '@mui/material';
import * as React from 'react';
import { Header, NotFound, Sidebar } from '../Common';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../features/dashboard';
import StudentFeature from '../../features/students';

export interface AdminLayoutProps {}

export function AdminLayout(props: AdminLayoutProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '240px 1fr',
        gridTemplateAreas: `"header header" "sidebar main"`,
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          gridArea: 'header',
        }}
      >
        <Header />
      </Box>
      <Box
        sx={{ gridArea: 'sidebar', borderRight: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Sidebar />
      </Box>
      <Box
        sx={{
          gridArea: 'main',
          backgroundColor: (theme) => theme.palette.background.paper,
          py: 2,
          px: 3,
        }}
      >
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<StudentFeature />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </Box>
  );
}
