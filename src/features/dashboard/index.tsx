import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { dashboardActions } from './dashboardSlice';

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
  return <div>Dashboard</div>;
}
