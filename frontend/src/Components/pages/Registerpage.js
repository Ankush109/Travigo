import { Avatar, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginuser, register } from "../../Actions/user";
import "./registerpage.css";
import { useAlert } from "react-alert";
function Registerpage() {
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const alert = useAlert();
  const [password, setPassword] = useState("");
  const [avatar, setimage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isauthenticated, error, loading, message } = useSelector(
    (state) => state.user
  );
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
  const registerhandler = (e) => {
    e.preventDefault();
    // console.log(email, password, name);
    dispatch(register(email, password, name, avatar));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearerrors" });
    }
  }, [dispatch, error, alert]);
  return (
    <div className="loginpage">
      <form>
        <div className="form" onSubmit={registerhandler}>
          <div class="title">Welcome</div>
          <div class="subtitle">Let's create your account!</div>

          <div class="input-container ic1">
            <input
              onChange={(e) => setemail(e.target.value)}
              id="firstname"
              class="input"
              type="text"
              placeholder=" "
              value={email}
              required
            />

            <div class="cut"></div>

            <label for="firstname" class="placeholder">
              Email
            </label>
          </div>
          <div class="input-container ic2">
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="lastname"
              class="input"
              type="password"
              value={password}
              placeholder=" "
              required
            />
            <div class="cut"></div>
            <label for="lastname" class="placeholder">
              Give a password
            </label>
          </div>
          <div class="input-container ic2">
            <input
              onChange={(e) => setname(e.target.value)}
              id="lastname"
              class="input"
              type="text"
              placeholder=" "
              required
              value={name}
            />
            <div class="cut"></div>
            <label for="lastname" class="placeholder">
              Full Name
            </label>
          </div>
          <div className="inputfile">
            <input type="file" accept="image/*" onChange={handleimagchange} />
            <Button disabled={loading} onClick={registerhandler}>
              Register
            </Button>
          </div>
          {avatar && (
            <Avatar
              alt="user"
              sx={{ height: "7vmax", width: "7vmax" }}
              src={avatar}
            />
          )}

          <div className="op">
            <Link to="/login">
              <h3
                style={{
                  color: "white",
                  backgroundColor: "black",
                  borderRadius: "10px",
                }}
              >
                Already registered? Click here to login
              </h3>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Registerpage;
