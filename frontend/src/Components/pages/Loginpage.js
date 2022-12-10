import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { loginuser } from "../../Actions/user";
import "./loginpage.css";
function Loginpage() {
  const [email, setemail] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const { error, message } = useSelector((state) => state.user);
  const loginhandler = (e) => {
    e.preventDefault();
    dispatch(loginuser(email, password));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearerrors" });
    }
    if (message) {
      dispatch({ type: "clearmessage" });
    }
  }, [dispatch, error, message, alert]);
  return (
    <form onSubmit={loginhandler}>
      <div className="loginpage">
        <div className="form">
          <div class="title">Welcome Again </div>
          <div class="subtitle">Sign in to your account</div>

          <div class="input-container ic1">
            <input
              onChange={(e) => setemail(e.target.value)}
              id="firstname"
              class="input"
              type="text"
              placeholder=" "
              required
            />

            <div class="cut"></div>

            <label for="firstname" class="placeholder">
              Give your Email
            </label>
          </div>
          <div class="input-container ic2">
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="lastname"
              class="input"
              type="text"
              placeholder=" "
              required
            />
            <div class="cut"></div>
            <label for="lastname" class="placeholder">
              Give your password
            </label>
          </div>
          <Button variant="contained" onClick={loginhandler}>
            Login
          </Button>
          <div className="op">
            <Link to="/register">
              <h3
                style={{
                  color: "white",
                  backgroundColor: "black",
                  borderRadius: "10px",
                }}
              >
                Create a new account
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Loginpage;
