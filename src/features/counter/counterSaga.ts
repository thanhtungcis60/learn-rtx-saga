import { PayloadAction } from '@reduxjs/toolkit';
import { take, takeEvery } from 'redux-saga/effects';
import { increment } from './counterSlice';

export function* log(action: PayloadAction) {
  console.log('Log:', action);
}

export default function* counterSaga() {
  // yield all([counterSaga()]);
  console.log('Counter saga');
  yield takeEvery(increment().type, log); //Effect của saga lắng nghe action increment
}
