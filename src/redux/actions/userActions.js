import {
  START_GET_USERS,
  START_CREATE_USER,
  STORE_USER_TO_WORK,
  START_UPDATE_USER,
  SET_MODAL_STATE,
  START_DELETE_USER,
  CLEAR_STORED_USER,
} from "redux/actionTypes";

export const setModalState = payload => ({ type: SET_MODAL_STATE, payload });

export const getUsers = () => ({ type: START_GET_USERS });

export const createUser = payload => ({ type: START_CREATE_USER, payload });

export const storeUser = payload => ({ type: STORE_USER_TO_WORK, payload });

export const editUser = payload => ({ type: START_UPDATE_USER, payload });

export const deleteUser = payload => ({ type: START_DELETE_USER, payload });

export const clearUserState = () => ({ type: CLEAR_STORED_USER });
