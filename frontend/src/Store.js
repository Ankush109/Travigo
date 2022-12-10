import { configureStore, createSlice } from "@reduxjs/toolkit";
import { commentreducer, mypostreducer } from "./Reducers/Post";

import { getallusers, postreducer, userreducer } from "./Reducers/User";

export const store = configureStore({
  reducer: {
    user: userreducer,
    posts: postreducer,
    allusers: getallusers,
    comment: commentreducer,
    myposts: mypostreducer,
  },
});

export default store;
// creating a store
