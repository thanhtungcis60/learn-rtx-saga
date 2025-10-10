import { Box, Button, Paper, Typography } from '@mui/material';
import * as React from 'react';

export default function LoginPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>
        <Box mt={4}>
          <Button variant="contained" color="primary" fullWidth>
            Fake Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
