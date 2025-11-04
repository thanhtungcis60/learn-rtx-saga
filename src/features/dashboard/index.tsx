import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { StatisticItem } from './components/StatisticItemProps';
import { dashboardActions } from './dashboardSlice';
import Widget from './components/Widget';
import { StudentRankingList } from './components/StudentRankingList';

export interface DashboardProps {}

export default function Dashboard(props: DashboardProps) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.dashboard.loading);
  const statistics = useAppSelector((state) => state.dashboard.statistics);
  const highestStudentList = useAppSelector((state) => state.dashboard.highestStudentList);
  const lowestStudentList = useAppSelector((state) => state.dashboard.lowestStudentList);
  const rankingByCityList = useAppSelector((state) => state.dashboard.rankingbyCityList);

  console.log(loading, statistics, highestStudentList, lowestStudentList, rankingByCityList);

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);
  return (
    <Box sx={{ position: 'relative', pt: 1 }}>
      {/* Loading */}
      {loading && (
        <LinearProgress
          sx={(theme) => ({ position: 'absolute', top: theme.spacing(-1), width: '100%' })}
        />
      )}

      {/* Statistic Section */}
      <Box
        sx={{
          display: 'grid',
          gap: 2, // tương đương spacing={2}
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 1fr',
            lg: 'repeat(4, 1fr)',
          },
        }}
      >
        <Box>
          <StatisticItem
            icon={<MaleIcon fontSize="large" color="primary" />}
            label="male"
            value={statistics.maleCount}
          />
        </Box>
        <Box>
          <StatisticItem
            icon={<FemaleIcon fontSize="large" color="primary" />}
            label="female"
            value={statistics.femaleCount}
          />
        </Box>
        <Box>
          <StatisticItem
            icon={<TrendingUpIcon fontSize="large" color="primary" />}
            label="mark >= 8"
            value={statistics.highMarkCount}
          />
        </Box>
        <Box>
          <StatisticItem
            icon={<TrendingDownIcon fontSize="large" color="primary" />}
            label="mark <= 5"
            value={statistics.lowMarkCount}
          />
        </Box>
      </Box>

      {/* All student ranking */}
      <Box mt={4}>
        <Typography variant="h4">All students</Typography>
        <Box
          sx={{
            display: 'grid',
            gap: 2, // tương đương spacing={2}
            gridTemplateColumns: {
              xs: '1fr',
              md: '1fr 1fr',
              lg: 'repeat(4, 1fr)',
            },
            mt: 2,
          }}
        >
          <Box>
            <Widget title="Student with highest mark">
              <StudentRankingList studentList={highestStudentList} />
            </Widget>
          </Box>
          <Box>
            <Widget title="Student with lowest mark">
              <StudentRankingList studentList={lowestStudentList} />
            </Widget>
          </Box>
        </Box>
      </Box>

      {/* Ranking by city */}
      <Box mt={4}>
        <Typography variant="h4">Ranking by city</Typography>
        <Box
          sx={{
            display: 'grid',
            gap: 2, // tương đương spacing={2}
            gridTemplateColumns: {
              xs: '1fr',
              md: '1fr 1fr',
              lg: 'repeat(4, 1fr)',
            },
            mt: 2,
          }}
        >
          {rankingByCityList.map((rankingByCity) => (
            <Box>
              <Widget title={`Tp. ${rankingByCity.cityName}`}>
                <StudentRankingList studentList={rankingByCity.rankingList} />
              </Widget>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
