import { all, call, put, takeLatest } from 'redux-saga/effects';
import { dashboardActions, DashboardStatistics, RankingbyCityList } from './dashboardSlice';
import { City, ListResponse, Student } from '../../models';
import studentApi from '../../api/studentApi';
import Dashboard from '.';
import cityApi from '../../api/cityApi';

function* fetchStatistics() {
  const responseList: Array<ListResponse<Student>> = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'male' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'female' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
  ]);
  const statisticList = responseList.map((x) => x.pagination._totalRows);
  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticList;
  const statistics: DashboardStatistics = {
    maleCount,
    femaleCount,
    highMarkCount,
    lowMarkCount,
  };
  yield put(dashboardActions.setStatistics(statistics));
}

function* fetchHighestStudentList() {
  const { data, pagination }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc',
  });
  yield put(dashboardActions.setHighestStudentList(data));
}
function* fetchLowestStudentList() {
  const { data, pagination }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'asc',
  });
  yield put(dashboardActions.setLowestStudentList(data));
}
function* fetchRankingByCityList() {
  const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);
  const callList = cityList.map((city) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      _order: 'desc',
      city: city.code,
    }),
  );
  const responseList: Array<ListResponse<Student>> = yield all(callList);
  const rankingbyCityList: RankingbyCityList[] = cityList.map((city, idx) => ({
    cityId: city.code,
    rankingList: responseList[idx].data,
  }));
  yield put(dashboardActions.setRankingbyCityList(rankingbyCityList));
}

function* fetchDashboardData() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingByCityList),
    ]);
    yield put(dashboardActions.fetchDataSuccess());
  } catch (error) {
    console.log('Failed to fetch dashboard data ', error);
    yield put(dashboardActions.fetchDataFailed());
  }
}

export default function* dashboardSaga() {
  yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}
