import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { authActions } from '../authSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLogging = useAppSelector((state) => state.auth.logging);

  const handleLoginClick = () => {
    dispatch(
      authActions.login({
        username: 'user1',
        password: '',
        onSuccess: () => navigate('/admin/dashboard'),
        onError: (err) => console.log(`Login fail: ${err}`),
      }),
    );
  };
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
          <Button variant="contained" color="primary" onClick={handleLoginClick} fullWidth>
            {isLogging && <CircularProgress size={20} color="secondary" />}
            Fake Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
