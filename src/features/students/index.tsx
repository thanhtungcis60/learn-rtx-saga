import { Box } from '@mui/material';
import { Route, Routes, useLocation } from 'react-router-dom';
import { NotFound } from '../../component/Common';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';

export interface StudentFeatureProps {}

export default function StudentFeature(props: StudentFeatureProps) {
  const location = useLocation();
  console.log('location.pathname ', location.pathname);
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
