import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    login: {
      currentuser: null,
      requesting: false,
      successful: false,
      messages: [],
      error: null,
    },
    register: {
      successful: false,
      currentuser: null,
      requesting: false,
      error: null,
    },
  },
  reducers: {
    login: (state, action) => {
      state.login.requesting = true;
    },
    loginSuccess: (state, action) => {
      state.login.successful = true;
      state.login.requesting = false;
      state.login.currentuser = action.payload;
    },
    loginFailed: (state, action) => {
      state.login.successful = false;
      state.login.error = action.payload;
      state.login.messages = [];
    },
    register: (state, action) => {
      state.register.requesting = false;
    },
    registerSuccess: (state, action) => {
      state.register.requesting = true;
      state.register.successful = true;
    },
    registerFailed: (state, action) => {
      state.register.requesting = false;
      state.register.messages = [{ body: "Logging in...", time: new Date() }];
      state.register.successful = false;
    },
    logout: (state) => {
      state.login.successful = false;
      state.login.currentuser = null;
    },
  },
});
export const {
  login,
  logout,
  loginSuccess,
  loginFailed,
  register,
  registerSuccess,
  registerFailed,
} = userSlice.actions;

export default userSlice.reducer;
