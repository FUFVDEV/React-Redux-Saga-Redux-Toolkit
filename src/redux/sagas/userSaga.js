import { call, put, takeLatest } from "redux-saga/effects";
import { message } from "antd";

import { GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER } from "redux/actionTypes";
import { generateEndpoint, httpAction } from "api/ApiUtils";
import { inputUserAdapter, ouputUserAdapter } from "adapters/user.adapter";
import {
  createUser,
  deleteUser,
  editUser,
  failedUserOperation,
  setUsers,
  startUserOperation,
} from "redux/slices/userSlice";

function* getUsersSaga() {
  try {
    yield put(startUserOperation());

    const response = yield call(httpAction, generateEndpoint("users", { searchs: { limit: 5 } }));
    const data = yield call([response, "json"]);
    const mappedData = data.users.map(user => inputUserAdapter(user));

    yield put(setUsers(mappedData));
  } catch {
    yield put(failedUserOperation());
  }
}

function* createUserSaga({ payload: user }) {
  try {
    yield put(startUserOperation());
    message.loading({ content: "Ejecutando operación...", key: "messageKey" });

    const response = yield call(
      httpAction,
      generateEndpoint("user", { params: { id: "add" } }),
      "POST",
      ouputUserAdapter(user)
    );
    const data = yield call([response, "json"]);
    yield put(createUser(inputUserAdapter(data)));

    message.success({
      content: "Usuario creado exitosamente.",
      key: "messageKey",
      duration: 2,
    });
  } catch (error) {
    yield put(failedUserOperation());

    message.error({
      content: "Ocurrió un error al intentar crear el usuario.",
      key: "messageKey",
      duration: 2,
    });
  }
}

function* editUserSaga({ payload: user }) {
  try {
    yield put(startUserOperation());
    message.loading({ content: "Ejecutando operación...", key: "messageKey" });

    const response = yield call(
      httpAction,
      generateEndpoint("user", { params: { id: user.id } }),
      "PATCH",
      ouputUserAdapter(user)
    );
    const data = yield call([response, "json"]);
    yield put(editUser(inputUserAdapter(data)));

    message.success({
      content: "Usuario actualizado exitosamente.",
      key: "messageKey",
      duration: 2,
    });
  } catch (error) {
    yield put(failedUserOperation());

    message.error({
      content: "Ocurrió un error al intentar actualizar los datos del usuario.",
      key: "messageKey",
      duration: 2,
    });
  }
}

function* deleteUserSaga({ payload: userId }) {
  try {
    yield put(startUserOperation());
    message.loading({ content: "Ejecutando operación...", key: "messageKey" });

    const response = yield call(
      httpAction,
      generateEndpoint("user", { params: { id: userId } }),
      "DELETE"
    );
    const data = yield call([response, "json"]);
    yield put(deleteUser(inputUserAdapter(data)));

    message.success({
      content: "Usuario eliminado exitosamente.",
      key: "messageKey",
      duration: 2,
    });
  } catch (error) {
    yield put(failedUserOperation());

    message.error({
      content: "Ocurrió un error al intentar eliminar al usuario.",
      key: "messageKey",
      duration: 2,
    });
  }
}

// Watchers
export default function* userWatcher() {
  yield takeLatest(GET_USERS, getUsersSaga);
  yield takeLatest(CREATE_USER, createUserSaga);
  yield takeLatest(UPDATE_USER, editUserSaga);
  yield takeLatest(DELETE_USER, deleteUserSaga);
}
