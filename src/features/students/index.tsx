import { Box } from '@mui/material';
import { Route, Routes, useLocation } from 'react-router-dom';
import { NotFound } from '../../component/Common';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';
import { useAppDispatch } from '../../app/hooks';
import { useEffect } from 'react';
import { cityActions } from '../city/citySlice';

export interface StudentFeatureProps {}

export default function StudentFeature(props: StudentFeatureProps) {
  const location = useLocation();
  // console.log('location.pathname ', location.pathname);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, []);
  return (
    <Box>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="add" element={<AddEditPage />} />
        <Route path=":studentId" element={<AddEditPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}
