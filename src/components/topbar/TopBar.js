import React from "react";
import logo from "../assets/report.ico";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LanugageSelector from "../shared/LanugageSelector";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../redux/authActions";

const TopBar = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { username, isLoggedIn } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
    username: store.username,
  }));

  const onLogoutSuccess = () => {
    dispatch(logoutSuccess());
  };

  let links = (
    <ul className="navbar-nav ml-auto">
      <li>
        <Link className="nav-link" to="/login">
          {" "}
          {t("Login")}
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/register">
          {" "}
          {t("Sign Up")}
        </Link>
      </li>
    </ul>
  );
  if (isLoggedIn) {
    links = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-link">
          <Link className="nav-link" to={`/user/${username}`}>
            {username}
          </Link>
        </li>
        <li
          className="nav-link"
          onClick={onLogoutSuccess}
          style={{ cursor: "pointer" }}
        >
          {t("Logout")}
        </li>
      </ul>
    );
  }

  return (
    <div className="shadow-sm ng-light mb-2">
      <nav className="navbar navbar-light container navbar-expand">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Lab Logo" />
        </Link>
        {links}
      </nav>
    </div>
  );
};

export default TopBar;
