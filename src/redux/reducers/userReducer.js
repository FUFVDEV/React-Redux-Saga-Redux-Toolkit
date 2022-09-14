import {
  ADD_USERS,
  ADD_USER,
  CLEAR_USER,
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
} from "redux/actionTypes";

const initialState = {
  users: [],
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case ADD_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case ADD_USER:
      return {
        ...state,
        user: action.payload,
      };

    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user => (user.id !== action.payload.id ? user : action.payload)),
      };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };

    case CLEAR_USER:
      return {
        ...state,
        user: [],
      };

    default:
      return state;
  }
};
