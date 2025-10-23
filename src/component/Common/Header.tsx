import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../features/auth/authSlice';

export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Student Management
          </Typography>
          <Button
            variant="contained"
            color="inherit"
            onClick={() =>
              dispatch(
                authActions.logout({
                  onSuccess: () => navigate('/login'),
                  onError: (err) => console.log(`Logout fail: ${err}`),
                }),
              )
            }
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
