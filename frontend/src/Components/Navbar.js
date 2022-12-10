import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./navbar.css";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AddCircleIcon from "@mui/icons-material/AddCircle";
function Navbar() {
  const { isauthenticated, user } = useSelector((state) => state.user);
  // console.log(isauthenticated);
  return (
    <div className="main">
      <div className="main-header">
        <Link to="/">
          <h2 className="text">Travel-loggers</h2>
        </Link>
      </div>

      <div className="routes">
        <div className="login">
          <Link to="/register">
            {/* <h3 className="text">Login/Register</h3> */}
            {isauthenticated ? (
              <div
                style={{
                  display: "flex",
                  padding: "4px",
                  alignItems: "center",
                }}
              >
                <h3 className="text">Welcome {user.name}</h3>
                <Avatar src={user.avatar.url} />
              </div>
            ) : (
              <h3 className="text">login/register</h3>
            )}
          </Link>
        </div>
        <div className="addpost">
          <Link to="/post/upload">
            <div
              style={{
                display: "flex",
                padding: "4px",
                alignItems: "center",
              }}
            >
              <h3 className="text">AddPost</h3>
              <ControlPointIcon style={{ color: "white" }} />
            </div>
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            padding: "4px",
            alignItems: "center",
          }}
        >
          <h3 className="text">Search</h3>
          <Link to="/search">
            <SearchTwoToneIcon style={{ color: "white" }} />
          </Link>
        </div>
        <div className="text">
          <Link to="/account">
            <div
              style={{
                display: "flex",
                padding: "4px",
                alignItems: "center",
              }}
            >
              <h3 className="text">My Account</h3>
              <AccountCircleTwoToneIcon style={{ color: "white" }} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
