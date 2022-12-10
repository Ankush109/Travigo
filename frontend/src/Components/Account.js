import { Avatar, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getmypost, logoutuser } from "../Actions/user";
import Loader from "./Loader/Loader";
import Post from "./Post";
import "./account.css";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
function Account() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, post } = useSelector((state) => state.myposts);
  const { user } = useSelector((state) => state.user);
  const logouthandler = () => {
    dispatch(logoutuser());
    alert.success("Logged out successfully");
  };
  useEffect(() => {
    dispatch(getmypost());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {post && post.length > 0 ? (
          post.map((post) => (
            <Post
              isaccount={true}
              postimage={post.image.url}
              postid={post._id}
              comments={post.comments}
              key={post._id}
              ownername={post.owner.name}
              caption={post.location}
              ownerimage={post.owner.avatar.url}
              costoftravel={post.costoftravel}
              heritagesites={post.Heritagesites}
              access={post.accessofcommunity}
              ownerid={post.owner._id}
              createdAt={post.createdAt}
            />
          ))
        ) : (
          <Typography variant="h6">You have not made any post</Typography>
        )}
      </div>
      <div className="accountright">
        <Avatar src={user.avatar.url} />
        <Typography variant="h6">{user.name}</Typography>
        <Button onClick={logouthandler} variant="contained">
          Logout
        </Button>
        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change Password</Link>
        <Button variant="text" style={{ color: "red", margin: "2vmax" }}>
          Delete my profile
        </Button>
      </div>
    </div>
  );
}
export default Account;
