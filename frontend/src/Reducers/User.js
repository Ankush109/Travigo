import { TrainOutlined } from "@mui/icons-material";
import { createReducer } from "@reduxjs/toolkit";

const initialstate = {
  isauthenticated: false,
};
export const userreducer = createReducer(initialstate, {
  allUsersRequest: (state) => {
    state.loading = true;
  },
  allUsersSuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },
  allUsersFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  loginrequest: (state) => {
    state.loading = true;
  },
  loginsuceess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isauthenticated = true;
  },
  loginfailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isauthenticated = false;
  },

  logoutrequest: (state) => {
    state.loading = true;
  },
  logoutsuccess: (state, action) => {
    state.loading = false;
    state.user = null;
    state.isauthenticated = false;
  },
  logoutfailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isauthenticated = true;
  },
  registerrequest: (state) => {
    state.loading = true;
  },
  registersucccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isauthenticated = true;
  },
  registerfailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isauthenticated = false;
  },
  loaduserrequest: (state) => {
    state.loading = true;
  },
  loadusersuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isauthenticated = true;
  },
  loaduserfailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isauthenticated = false;
  },
  clearerrors: (state) => {
    state.error = null;
  },
});
export const postreducer = createReducer(initialstate, {
  postrequest: (state) => {
    state.loading = true;
  },
  postsuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  postfailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearerrors: (state) => {
    state.error = null;
  },
});
export const getallusers = createReducer(initialstate, {
  alluserrequest: (state) => {
    state.loading = true;
  },
  allusersuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },
  alluserfailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearerrors: (state) => {
    state.error = null;
  },
});
