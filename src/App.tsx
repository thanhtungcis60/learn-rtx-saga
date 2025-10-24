import { Route, Routes } from 'react-router-dom';
import './App.css';
import { NotFound, PrivateRoute } from './component/Common';
import { AdminLayout } from './component/Layout';
import LoginPage from './features/auth/pages/LoginPage';

function App() {
  // useEffect(() => {
  //   cityApi.getAll().then((response) => response.data.forEach((city) => console.log(city.code)));
  // }, []);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin/*"
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
