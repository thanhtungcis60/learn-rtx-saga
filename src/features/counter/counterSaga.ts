import { PayloadAction } from '@reduxjs/toolkit';
import { delay, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { increment, incrementSaga, incrementSagaSuccess } from './counterSlice';

// export function* log(action: PayloadAction) {
//   console.log('Log:', action);
// }
export function* handleIncrementSaga(action: PayloadAction<number>) {
  console.log('Waiting 1 seconds...');
  yield delay(1000);
  console.log('Waiting done, dispatch action...');
  yield put(incrementSagaSuccess(action.payload));
}

export default function* counterSaga() {
  // yield all([counterSaga()]);
  // console.log('Counter saga');
  yield takeEvery(incrementSaga.toString(), handleIncrementSaga); //Effect của saga lắng nghe action increment
  // yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
}
