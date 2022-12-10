import axios from "axios";
export const register = (email, password, name, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "registerrequest",
    });
    const { data } = await axios.post(
      "/api/v1/register",
      { email, password, name, avatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "registersucccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "registerfailure",
      payload: error.response.data.message,
    });
  }
};
export const logoutuser = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutrequest",
    });
    await axios.get("/api/v1/logout");
    dispatch({
      type: "logoutsuccess",
    });
  } catch (error) {
    dispatch({
      type: "logoutfailure",
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: "allUsersRequest",
      });

      const { data } = await axios.get(`/api/v1/users?name=${name}`);
      console.log("data ", data);
      dispatch({
        type: "allUsersSuccess",
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: "allUsersFailure",
        payload: error.response.data.message,
      });
    }
  };
export const useraddpost =
  (
    caption,
    location,
    costoftravel,
    Heritagesites,
    Safety,
    accessofcommunity,
    image
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "newpostrequest",
      });
      const { data } = await axios.post(
        "/api/v1/post/upload",
        {
          caption,
          location,
          costoftravel,
          Heritagesites,
          Safety,
          accessofcommunity,
          image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "newpostsuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "newpostfailure",
        payload: error.response.data.message,
      });
    }
  };

export const loginuser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginrequest",
    });
    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "loginsuceess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "loginfailure",
      payload: error.response.data.message,
    });
  }
};
export const loadusers = () => async (dispatch) => {
  try {
    dispatch({
      type: "loaduserrequest",
    });
    const { data } = await axios.get("/api/v1/me");

    dispatch({
      type: "loadusersuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "loaduserfailure",
      payload: error.response.data.message,
    });
  }
};
export const getposts = () => async (dispatch) => {
  try {
    dispatch({
      type: "postrequest",
    });
    const { data } = await axios.get("/api/v1/posts");
    console.log(data);
    dispatch({
      type: "postsuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "postfailure",
      payload: error.response.data.message,
    });
  }
};
export const getallusersaction = () => async (dispatch) => {
  try {
    dispatch({
      type: "alluserrequest",
    });
    const { data } = await axios.get("/api/v1/users");
    console.log(data);
    dispatch({
      type: "allusersuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "alluserfailure",
      payload: error.response.data.message,
    });
  }
};
export const addcomment = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "commentrequest",
    });
    const { data } = await axios.post(
      `/api/v1/post/comment/${id}`,
      {
        comment,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "commentsuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "commentfailure",
      payload: error.response.data.message,
    });
  }
};
export const getmypost = () => async (dispatch) => {
  try {
    dispatch({
      type: "mypostrequest",
    });
    const { data } = await axios.get("/api/v1/me/posts");
    console.log(data);
    dispatch({
      type: "mypostsuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "mypostsfailure",
      payload: error.response.data.message,
    });
  }
};
