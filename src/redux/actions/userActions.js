import { GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER } from "redux/actionTypes";

export const getUsers = () => ({ type: GET_USERS });
export const createUser = payload => ({ type: CREATE_USER, payload });
export const editUser = payload => ({ type: UPDATE_USER, payload });
export const deleteUser = payload => ({ type: DELETE_USER, payload });
