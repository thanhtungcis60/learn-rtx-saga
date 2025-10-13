import { all } from 'redux-saga/effects';
import counterSaga from '../features/counter/counterSaga';
import authSaga from '../features/auth/authSaga';

function* helloSaga() {
  console.log('Hello Sagas!');
}
export default function* rootSaga() {
  yield all([helloSaga(), counterSaga(), authSaga()]);
}
