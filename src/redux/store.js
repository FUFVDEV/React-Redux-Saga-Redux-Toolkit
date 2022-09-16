import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import createSagaMiddleware from "@redux-saga/core";

import user from "redux/slices/userSlice";
import rootSagas from "redux/sagas";

const rootReducer = combineReducers({
  user,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSagas);

export default store;
