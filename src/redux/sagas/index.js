import { all } from "redux-saga/effects";

import userWatcher from "./userSaga";

export default function* rootSagas() {
  yield all([userWatcher()]);
}
