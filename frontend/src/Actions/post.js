import axios from "axios";
export const updateuserpost = (location, id) => async (dispatch) => {
  try {
    dispatch({
      type: "updatepostrequest",
    });
    const { data } = await axios.put(
      `/api/v1/post/${id}`,
      {
        location,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "updatepostsuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updatepostfailure",
      payload: error.response.data.message,
    });
  }
};
export const updatemyprofile = (email, name, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "updateprofilerequest",
    });
    const { data } = await axios.put(
      `/api/v1/me/updateprofile`,
      {
        email,
        name,
        avatar,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "updateprofilesuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateprofilefailure",
      payload: error.response.data.message,
    });
  }
};
export const updatepassword =
  (oldpassword, newpassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatepasswordrequest",
      });
      const { data } = await axios.put(
        `/api/v1/update/password`,
        {
          oldpassword,
          newpassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "updatepasswordsucess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updatepasswordfailure",
        payload: error.response.data.message,
      });
    }
  };
export const deletemypost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleterequest",
    });
    const { data } = await axios.delete(`/api/v1/post/${id}`);

    dispatch({
      type: "deletesuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletefailure",
      payload: error.response.data.message,
    });
  }
};
