import { call, delay, fork, take, put } from 'redux-saga/effects';
import { authActions, LoginPayload, LogoutPayload } from './authSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(1000);
    localStorage.setItem('access_token', 'fake_token');
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: 'Easy Frontend',
      }),
    );
    // ✅ Gọi callback onSuccess nếu có
    if (payload.onSuccess) {
      payload.onSuccess();
    }
  } catch (error) {
    let errorMsg = '';
    if (error instanceof Error) {
      errorMsg = error.message;
    } else {
      errorMsg = 'Unknown error';
    }
    yield put(authActions.loginFail(errorMsg));
    if (payload.onError) {
      payload.onError(errorMsg);
    }
  }
}
function* handleLogout(payload: LogoutPayload) {
  yield delay(500);
  localStorage.removeItem('access_token');
  //redirect to login page
  if (payload.onSuccess) {
    payload.onSuccess();
  }
}
function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }
    const actionLogout: PayloadAction<LogoutPayload> = yield take(authActions.logout.type);
    yield call(handleLogout, actionLogout.payload);
  }
}
export default function* authSaga() {
  yield fork(watchLoginFlow);
}
