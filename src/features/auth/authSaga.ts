import { fork, take } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* handleLogin(payload: LoginPayload) {
  console.log('Handle login', payload);
}
function* handleLogout() {
  console.log('Handle logout');
}
function* watchLoginFlow() {
  console.log('authActions.login.type: ', authActions.login.type);
  while (true) {
    const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
    yield fork(handleLogin, action.payload);
    yield take(authActions.logout.type);
    yield fork(handleLogout);
  }
}
export default function* authSaga() {
  yield fork(watchLoginFlow);
}
