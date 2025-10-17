import { useEffect } from 'react';
import './App.css';
import cityApi from './api/cityApi';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './features/auth/pages/LoginPage';
import { AdminLayout } from './component/Layout';
import { NotFound, PrivateRoute } from './component/Common';
import { useAppDispatch } from './app/hooks';
import { Button } from '@mui/material';
import { authActions } from './features/auth/authSlice';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   cityApi.getAll().then((response) => response.data.forEach((city) => console.log(city.code)));
  // }, []);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
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
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
