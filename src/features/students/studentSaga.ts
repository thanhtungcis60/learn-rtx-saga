import { PayloadAction } from '@reduxjs/toolkit';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { studentActions } from './studentSlice';
import { ListParams, ListResponse, Student } from '../../models';
import studentApi from '../../api/studentApi';

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch student list', error);
    yield put(studentActions.fetchStudentListFailed());
  }
}
function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  // console.log('Sudent Saga debounce: ', action.payload);

  yield put(studentActions.setFilter(action.payload));
}

export default function* studentSaga() {
  yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList);
  yield debounce(500, studentActions.setFilterWithDebounce.type, handleSearchDebounce); //Chờ 500 ms từ khi người dùng ngừng gõ rồi mới thay đổi filter từ đó trigger gọi API
}
