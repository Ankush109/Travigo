import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import "./updatepassword.css";
import { updatepassword } from "../../Actions/post";

function Updatepassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, message } = useSelector((state) => state.comment);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatepassword(oldPassword, newPassword));
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
  }, [dispatch, error, alert, message]);

  return (
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Aap
        </Typography>

        <input
          type="password"
          placeholder="Old Password"
          required
          value={oldPassword}
          className="updatePasswordInputs"
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          required
          className="updatePasswordInputs"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Button disabled={loading} type="submit">
          Change Password
        </Button>
      </form>
    </div>
  );
}

export default Updatepassword;
