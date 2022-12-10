import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./newpost.css";
import { useDispatch, useSelector } from "react-redux";
import { useraddpost } from "../../Actions/user";
import { useAlert } from "react-alert";
function Newpost() {
  const [image, setimage] = useState(null);
  const [location, setloaction] = useState("");
  const [caption, setsetcaption] = useState("");
  const [costoftravel, setcostoftravel] = useState("");
  const [Heritagesites, setheritagesites] = useState("");
  const dispatch = useDispatch();
  const [accessofcommunity, setaccessofcommunity] = useState("");
  const { loading, error, message } = useSelector((state) => state.comment);
  const alert = useAlert();
  const [Safety, setsafety] = useState("");
  const handleimagchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setimage(reader.result);
      }
    };
  };
  // caption,
  // location,
  // costoftravel,
  // Heritagesites,
  // Safety,
  // accessofcommunity,
  // image,
  const submithandler = async (e) => {
    e.preventDefault();
    await dispatch(
      useraddpost(
        caption,
        location,
        costoftravel,
        Heritagesites,
        Safety,
        accessofcommunity,
        image
      )
    );
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearerrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearmessage" });
    }
  }, [dispatch, error, message, alert]);
  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submithandler}>
        <Typography variant="h3">New Post</Typography>
        {image && <img src={image} alt="post" />}
        <input type="file" accept="image/*" onChange={handleimagchange} />
        <input
          type="text"
          value={location}
          onChange={(e) => setloaction(e.target.value)}
          placeholder="location"
        />
        <input
          type="text"
          value={caption}
          onChange={(e) => setsetcaption(e.target.value)}
          placeholder="caption"
        />
        <input
          type="text"
          value={costoftravel}
          onChange={(e) => setcostoftravel(e.target.value)}
          placeholder="costoftravel"
        />
        <input
          type="text"
          value={Heritagesites}
          onChange={(e) => setheritagesites(e.target.value)}
          placeholder="Heritagesites"
        />
        <input
          type="text"
          value={accessofcommunity}
          onChange={(e) => setaccessofcommunity(e.target.value)}
          placeholder="accessofcommunity"
        />
        <input
          type="text"
          value={Safety}
          onChange={(e) => setsafety(e.target.value)}
          placeholder="Safety"
        />
        <Button disabled={loading} type="submit">
          Post
        </Button>
      </form>
    </div>
  );
}

export default Newpost;
