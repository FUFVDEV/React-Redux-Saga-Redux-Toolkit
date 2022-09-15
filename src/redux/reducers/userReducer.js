import {
  START_GET_USERS,
  SUCCESS_GET_USERS,
  FAILED_GET_USERS,
  START_CREATE_USER,
  SUCCESS_CREATE_USER,
  FAILED_CREATE_USER,
  STORE_USER_TO_WORK,
  START_UPDATE_USER,
  SUCCESS_UPDATE_USER,
  FAILED_UPDATE_USER,
  START_DELETE_USER,
  SUCCESS_DELETE_USER,
  FAILED_DELETE_USER,
  SET_MODAL_STATE,
  CLEAR_STORED_USER,
} from "redux/actionTypes";

const initialState = {
  users: [],
  user: {},
  isLoading: false,
  isModalVisible: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_GET_USERS:
      return {
        ...state,
        isLoading: true,
      };

    case SUCCESS_GET_USERS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };

    case FAILED_GET_USERS:
      return {
        ...state,
        isLoading: false,
      };

    case START_CREATE_USER:
      return {
        ...state,
        isLoading: true,
      };

    case SUCCESS_CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        isModalVisible: false,
      };

    case FAILED_CREATE_USER:
      return {
        ...state,
        isLoading: false,
        isModalVisible: false,
      };

    case STORE_USER_TO_WORK:
      return {
        ...state,
        user: action.payload,
        isModalVisible: true,
      };

    case START_UPDATE_USER:
      return {
        ...state,
        isLoading: true,
      };

    case SUCCESS_UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user => (user.id !== action.payload.id ? user : action.payload)),
        isModalVisible: false,
      };

    case FAILED_UPDATE_USER:
      return {
        ...state,
        isLoading: false,
        isModalVisible: false,
      };

    case START_DELETE_USER:
      return {
        ...state,
        isLoading: true,
      };

    case SUCCESS_DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload.id),
        isModalVisible: false,
      };

    case FAILED_DELETE_USER:
      return {
        ...state,
        isLoading: false,
        isModalVisible: false,
      };

    case SET_MODAL_STATE:
      return {
        ...state,
        isModalVisible: action.payload,
      };

    case CLEAR_STORED_USER:
      return {
        ...state,
        user: [],
      };

    default:
      return state;
  }
};
