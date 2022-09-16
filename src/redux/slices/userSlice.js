import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    user: {},
    isLoading: false,
    isModalVisible: false,
  },
  reducers: {
    startUserOperation: state => ({ ...state, isLoading: true }),
    setUsers: (state, action) => ({ ...state, users: action.payload, isLoading: false }),
    createUser: (state, action) => ({
      ...state,
      users: [...state.users, action.payload],
      isLoading: false,
      isModalVisible: false,
    }),
    storeUser: (state, action) => ({ ...state, user: action.payload, isModalVisible: true }),
    editUser: (state, action) => ({
      ...state,
      users: state.users.map(user => (user.id !== action.payload.id ? user : action.payload)),
      isLoading: false,
      isModalVisible: false,
    }),
    deleteUser: (state, action) => ({
      ...state,
      users: state.users.filter(user => user.id !== action.payload.id),
      isLoading: false,
      isModalVisible: false,
    }),
    setModalState: (state, action) => ({ ...state, isModalVisible: action.payload }),
    clearUserState: state => ({ ...state, user: {} }),
    failedUserOperation: state => ({ ...state, isLoading: false, isModalVisible: false }),
  },
});
export const {
  startUserOperation,
  setUsers,
  createUser,
  storeUser,
  editUser,
  deleteUser,
  setModalState,
  clearUserState,
  failedUserOperation,
} = userSlice.actions;
export default userSlice.reducer;
