import {
  ADD_USERS,
  ADD_USER,
  CLEAR_USER,
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
} from "redux/actionTypes";

export const createUser = payload => {
  return {
    type: CREATE_USER,
    payload,
  };
};

export const addUsers = payload => {
  return {
    type: ADD_USERS,
    payload,
  };
};

export const addUser = payload => {
  return {
    type: ADD_USER,
    payload,
  };
};

export const updateUser = payload => {
  return {
    type: UPDATE_USER,
    payload,
  };
};

export const deleteUser = id => {
  return {
    type: DELETE_USER,
    payload: id,
  };
};

export const clearUserState = () => {
  return {
    type: CLEAR_USER,
  };
};
