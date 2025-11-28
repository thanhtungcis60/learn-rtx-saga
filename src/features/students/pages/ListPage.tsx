import { Box, Button, LinearProgress, Pagination, Typography } from '@mui/material';
import { useEffect } from 'react';
import { StudentTable } from '../components/StudentTable';

import StudentFilters from '../components/StudentFilters';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from '../studentSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCityList, selectCityMap } from '../../city/citySlice';
import { ListParams, Student } from '../../../models';
import studentApi from '../../../api/studentApi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export interface ListPageProps {}

export default function ListPage(props: ListPageProps) {
  const navigate = useNavigate();
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      }),
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    // console.log('Search change: ', newFilter);
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };
  const handleFilterChange = (newFilter: ListParams) => {
    // console.log('Search change: ', newFilter);
    dispatch(studentActions.setFilter(newFilter));
  };
  const handleRemoveStudent = async (student: Student) => {
    console.log('Handle remove student', student);
    try {
      // Remove student API
      await studentApi.remove(student?.id || '');

      // Trigger to re-fetch student list with current filter
      const newFilter = { ...filter };
      dispatch(studentActions.setFilter(newFilter));
    } catch (error) {
      // Toast error
      console.log('Failed to fetch student', error);
    }
  };
  return (
    <Box sx={{ position: 'relative', pt: 1 }}>
      {loading && (
        <LinearProgress
          sx={(theme) => ({ position: 'absolute', top: theme.spacing(-1), width: '100%' })}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h4">Students</Typography>

        <Button variant="contained" color="primary" onClick={() => navigate('add')}>
          Add new student
        </Button>
      </Box>
      {/* Filters */}
      <Box mb={3}>
        <StudentFilters
          filter={filter}
          cityList={cityList}
          onSearchChange={handleSearchChange}
          onChange={handleFilterChange}
        />
      </Box>
      {/* StudentTable */}
      <StudentTable studentList={studentList} cityMap={cityMap} onRemove={handleRemoveStudent} />
      {/* Pagination */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination?._page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
