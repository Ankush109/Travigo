import React, { useEffect } from "react";
import { getallusersaction, getposts } from "../../Actions/user";
import Post from "../Post";

import User from "../User/User";
import "./homepage.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";

function Homepage() {
  const dispatch = useDispatch();
  const { loading, posts, error } = useSelector((state) => state.posts);
  const { users, loading: userloading } = useSelector(
    (state) => state.allusers
  );
  // console.log(posts._id);
  useEffect(() => {
    dispatch(getposts());
    dispatch(getallusersaction());
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearerrors" });
    }
  }, [alert, dispatch]);

  return loading === true || userloading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="home-left">
        {posts && posts.length > 0
          ? posts.map((post) => (
              <Post
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
          : "no post yet"}
      </div>
      <div className="home-right">
        {users && users.length > 0 ? (
          users.map((user) => (
            <div className="user">
              <User
                userid={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            </div>
          ))
        ) : (
          <h3>No users yet</h3>
        )}
      </div>
    </div>
  );
}

export default Homepage;
