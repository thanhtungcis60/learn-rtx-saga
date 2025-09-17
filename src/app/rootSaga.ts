import { all } from 'redux-saga/effects';
import counterSaga from '../features/counter/counterSaga';
function* helloSaga() {
  console.log('Hello Sagas!');
}
export default function* rootSaga() {
  console.log('Root saga');
  yield all([helloSaga(), counterSaga()]);
}
