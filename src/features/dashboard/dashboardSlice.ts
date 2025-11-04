import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student } from '../../models';
import { stat } from 'fs';
export interface RankingbyCityList {
  cityId: string;
  rankingList: Student[];
}
export interface DashboardStatistics {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number;
  lowMarkCount: number;
}

export interface DashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  highestStudentList: Student[];
  lowestStudentList: Student[];
  rankingbyCityList: RankingbyCityList[];
}
const initialState: DashboardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    highMarkCount: 0,
    lowMarkCount: 0,
  },
  highestStudentList: [],
  lowestStudentList: [],
  rankingbyCityList: [],
};
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },
    fetchDataSuccess(state) {
      state.loading = false;
    },
    fetchDataFailed(state) {
      state.loading = false;
    },
    setStatistics(state, action: PayloadAction<DashboardStatistics>) {
      state.statistics = action.payload;
    },
    setHighestStudentList(state, action: PayloadAction<Student[]>) {
      state.highestStudentList = action.payload;
    },
    setLowestStudentList(state, action: PayloadAction<Student[]>) {
      state.lowestStudentList = action.payload;
    },
    setRankingbyCityList(state, action: PayloadAction<RankingbyCityList[]>) {
      state.rankingbyCityList = action.payload;
    },
  },
});
//Actions
export const dashboardActions = dashboardSlice.actions;

//Selectors
export const selectDashboardLoading = (state: { dashboard: DashboardState }) =>
  state.dashboard.loading;
export const selectDashboardStatistics = (state: { dashboard: DashboardState }) =>
  state.dashboard.statistics;
export const selectHighestStudentList = (state: { dashboard: DashboardState }) =>
  state.dashboard.highestStudentList;
export const selectLowestStudentList = (state: { dashboard: DashboardState }) =>
  state.dashboard.lowestStudentList;
export const selectRankingByCityList = (state: { dashboard: DashboardState }) =>
  state.dashboard.rankingbyCityList;

const dashboardReducer = dashboardSlice.reducer;

export default dashboardReducer;
