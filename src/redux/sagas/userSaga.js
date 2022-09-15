import { call, put, takeLatest } from "redux-saga/effects";
import { message } from "antd";

import {
  START_GET_USERS,
  SUCCESS_GET_USERS,
  FAILED_GET_USERS,
  START_UPDATE_USER,
  SUCCESS_UPDATE_USER,
  FAILED_UPDATE_USER,
  START_DELETE_USER,
  SUCCESS_DELETE_USER,
  FAILED_DELETE_USER,
  FAILED_CREATE_USER,
  START_CREATE_USER,
  SUCCESS_CREATE_USER,
} from "redux/actionTypes";
import { generateEndpoint, httpAction } from "api/ApiUtils";
import { inputUserAdapter, ouputUserAdapter } from "adapters/user.adapter";

function* getUsers() {
  try {
    const response = yield call(httpAction, generateEndpoint("users", { searchs: { limit: 5 } }));
    const data = yield call([response, "json"]);
    const mappedData = data.users.map(user => inputUserAdapter(user));

    yield put({ type: SUCCESS_GET_USERS, payload: mappedData });
  } catch {
    yield put({ type: FAILED_GET_USERS });
  }
}

function* createUser({ payload: user }) {
  try {
    message.loading({ content: "Ejecutando operación...", key: "messageKey" });

    const response = yield call(
      httpAction,
      generateEndpoint("user", { params: { id: "add" } }),
      "POST",
      ouputUserAdapter(user)
    );
    const data = yield call([response, "json"]);
    yield put({ type: SUCCESS_CREATE_USER, payload: inputUserAdapter(data) });

    message.success({
      content: "Usuario creado exitosamente.",
      key: "messageKey",
      duration: 2,
    });
  } catch (error) {
    yield put({ type: FAILED_CREATE_USER });

    message.error({
      content: "Ocurrió un error al intentar crear el usuario.",
      key: "messageKey",
      duration: 2,
    });
  }
}

function* editUser({ payload: user }) {
  try {
    message.loading({ content: "Ejecutando operación...", key: "messageKey" });

    const response = yield call(
      httpAction,
      generateEndpoint("user", { params: { id: user.id } }),
      "PATCH",
      ouputUserAdapter(user)
    );
    const data = yield call([response, "json"]);
    yield put({ type: SUCCESS_UPDATE_USER, payload: inputUserAdapter(data) });

    message.success({
      content: "Usuario actualizado exitosamente.",
      key: "messageKey",
      duration: 2,
    });
  } catch (error) {
    yield put({ type: FAILED_UPDATE_USER });

    message.error({
      content: "Ocurrió un error al intentar actualizar los datos del usuario.",
      key: "messageKey",
      duration: 2,
    });
  }
}

function* deleteUser({ payload: userId }) {
  try {
    message.loading({ content: "Ejecutando operación...", key: "messageKey" });

    const response = yield call(
      httpAction,
      generateEndpoint("user", { params: { id: userId } }),
      "DELETE"
    );
    const data = yield call([response, "json"]);
    yield put({ type: SUCCESS_DELETE_USER, payload: inputUserAdapter(data) });

    message.success({
      content: "Usuario eliminado exitosamente.",
      key: "messageKey",
      duration: 2,
    });
  } catch (error) {
    yield put({ type: FAILED_DELETE_USER });

    message.error({
      content: "Ocurrió un error al intentar eliminar al usuario.",
      key: "messageKey",
      duration: 2,
    });
  }
}

// Watchers
export default function* userWatcher() {
  yield takeLatest(START_GET_USERS, getUsers);
  yield takeLatest(START_CREATE_USER, createUser);
  yield takeLatest(START_UPDATE_USER, editUser);
  yield takeLatest(START_DELETE_USER, deleteUser);
}
