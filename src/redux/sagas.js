import { all } from 'redux-saga/effects';

import stage from './stage/saga';

export default function* rootSaga() {
  yield all([...stage]);
}
