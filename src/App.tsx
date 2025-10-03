import { useEffect } from 'react';
import './App.css';
import cityApi from './api/cityApi';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './features/auth/pages/LoginPage';
import { AdminLayout } from './component/Layout';
import { NotFound, PrivateRoute } from './component/Common';

function App() {
  useEffect(() => {
    cityApi.getAll().then((response) => response.data.forEach((city) => console.log(city.code)));
  }, []);

  return (
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
  );
}

export default App;
