import { createStore, combineReducers, compose, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";

import user from "redux/reducers/userReducer";
import rootSagas from "redux/sagas";

const rootReducer = combineReducers({
  user,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSagas);

export default store;
