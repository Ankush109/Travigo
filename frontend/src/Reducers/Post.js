import { createReducer } from "@reduxjs/toolkit";
const initialstate = {
  isauthenticated: false,
};
export const commentreducer = createReducer(initialstate, {
  commentrequest: (state) => {
    state.loading = true;
  },
  commentsuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  commentfailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  newpostrequest: (state) => {
    state.loading = true;
  },
  newpostsuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  newpostfailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  updatepostrequest: (state) => {
    state.loading = true;
  },
  updatepostsuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updatepostfailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  deleterequest: (state) => {
    state.loading = true;
  },
  deletesuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deletefailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  updateprofilerequest: (state) => {
    state.loading = true;
  },
  updateprofilesuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updateprofilefailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  updatepasswordrequest: (state) => {
    state.loading = true;
  },
  updatepasswordsucess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updatepasswordfailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearmessage: (state) => {
    state.message = null;
  },
  clearerrors: (state) => {
    state.error = null;
  },
});
export const mypostreducer = createReducer(initialstate, {
  mypostrequest: (state) => {
    state.loading = true;
  },
  mypostsuccess: (state, action) => {
    state.loading = false;
    state.post = action.payload;
  },
  mypostsfailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearerrors: (state) => {
    state.error = null;
  },
});
