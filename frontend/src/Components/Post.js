import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { Avatar, Button, Dialog } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./post.css";
import { useDispatch, useSelector } from "react-redux";
import { addcomment, getmypost, getposts } from "../Actions/user";
import { useAlert } from "react-alert";
import CommentCard from "./commentcard/Commentcard";
import { deletemypost, updateuserpost } from "../Actions/post";
function Post({
  postid,
  caption,
  postimage,
  costoftravel,
  heritagesites,
  access,
  createdAt,
  comments = [],
  ownerimage,
  ownername,
  ownerid,
  isdelete = true,
  isaccount = false,
}) {
  const [commentvalue, setcommentvalue] = useState("");
  const [commenttoggle, setcommenttoggle] = useState(false);
  const [captionvalue, setcaptionvalue] = useState("");
  const [captiontoggle, setcaptiontoggle] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();
  const addcommenthandler = async (e) => {
    e.preventDefault();

    await dispatch(addcomment(postid, commentvalue));

    alert.success("Comment added to the post");
    dispatch(getposts());
  };
  const updatehandler = () => {
    dispatch(updateuserpost(captionvalue, postid));
    dispatch(getmypost());
  };
  const deleteposthandler = async () => {
    await dispatch(deletemypost(postid));
    alert.success("post deleted");
    dispatch(getmypost());
  };
  return (
    <div className="post">
      <div className="postheader">
        {isaccount ? (
          <Button onClick={() => setcaptiontoggle(!captiontoggle)}>
            <MoreVertIcon />
          </Button>
        ) : null}
      </div>
      <img src={postimage} />
      <div className="left">
        <div className="text">
          <Link to={`/user/${ownerid}`}>
            <h4 style={{ alignSelf: "baseline" }}> Posted by </h4>
            <div>
              <Avatar src={ownerimage} />
              <span>{ownername}</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="postdetails">
        <div className="details">
          <h1 style={{ alignSelf: "end" }}>Location: {caption}</h1>
          <h3 style={{ alignSelf: "end" }}>Cost of Travel: ₹{costoftravel}</h3>
          <h3 style={{ alignSelf: "end" }}>Heritagesite: {heritagesites}</h3>

          <h3 style={{ alignSelf: "end" }}>Mode of Travel: {access}</h3>
          <span style={{ alignSelf: "end" }}>
            {" "}
            Posted on: {String(createdAt).substr(0, 10)}
          </span>
        </div>
      </div>
      <div className="postfooter">
        <Button onClick={() => setcommenttoggle(!commenttoggle)}>
          <CommentIcon />
        </Button>

        {isaccount ? (
          <Button onClick={deleteposthandler}>
            <DeleteIcon />
          </Button>
        ) : null}
      </div>
      <Dialog
        open={commenttoggle}
        onClose={() => setcommenttoggle(!commenttoggle)}
      >
        <div className="DialogBox">
          <h3>Comments</h3>
          <form className="commentForm" onSubmit={addcommenthandler}>
            <input
              type="text"
              value={commentvalue}
              onChange={(e) => setcommentvalue(e.target.value)}
              placeholder="comment here"
              required
            />
            <Button type="submit" variant="contained">
              Add
            </Button>
          </form>
          {comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                avatar={item.user.avatar.url}
                userId={item.user._id}
                name={item.user.name}
                comment={item.comment}
                commentId={item._id}
                key={item._id}
                postId={postid}
                isAccount={isaccount}
              />
            ))
          ) : (
            <Typography>No comments Yet</Typography>
          )}
        </div>
      </Dialog>

      <Dialog
        open={captiontoggle}
        onClose={() => setcaptiontoggle(!captiontoggle)}
      >
        <div className="DialogBox">
          <Typography>Update Caption</Typography>
          <form className="commentForm" onSubmit={updatehandler}>
            <input
              type="text"
              value={captionvalue}
              onChange={(e) => setcaptionvalue(e.target.value)}
              placeholder="comment here"
              required
            />
            <Button type="submit" variant="contained">
              update
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default Post;
