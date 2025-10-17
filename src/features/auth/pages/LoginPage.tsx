import { Box, Button, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { authActions } from '../authSlice';
import { useAppDispatch } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    dispatch(
      authActions.login({
        username: 'user1',
        password: '',
        onSuccess: () => navigate('/admin'),
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
            Fake Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
