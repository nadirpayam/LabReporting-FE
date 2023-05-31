import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/report.ico";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LanugageSelector from "../shared/LanugageSelector";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../redux/authActions";
import ProfileImageWithDefault from "../user/ProfileImageWithDefault";

const TopBar = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);

  const menuArea = useRef(null);

  const { username, isLoggedIn, image } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
    username: store.username,
    image: store.image,
  }));

  useEffect(() => {
    document.addEventListener("click", menuClickTracker);
    return () => {
      document.removeEventListener("click", menuClickTracker);
    };
  }, [isLoggedIn]);

  const menuClickTracker = (event) => {
    if (menuArea.current === null || !menuArea.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

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
    let dropDownClass = "dropdown-menu shadow p-0";
    if (menuVisible) {
      dropDownClass += " show";
    }

    links = (
      <ul className="navbar-nav ml-auto" ref={menuArea}>
        <li className="nav-item dropdown">
          <div
            className="d-flex"
            style={{ cursor: "pointer" }}
            onClick={() => setMenuVisible(true)}
          >
            <ProfileImageWithDefault
              image={image}
              width="32"
              height="32"
              className="rounded-circle m-auto"
            />
            <span className="nav-link dropdown-toggle"> {username}</span>
          </div>
          <div className={dropDownClass}>
            <Link
              className="dropdown-item d-flex p-2"
              to={`/user/${username}`}
              onClick={() => setMenuVisible(false)}
            >
              <i className="material-icons text-info mr-2">person</i>
              {t("My Profile")}
            </Link>
            {localStorage.getItem("role") === "LAB" && (
            <Link
              className="dropdown-item d-flex p-2"
              to={`/reports`}
              onClick={() => setMenuVisible(false)}
            >
              <i className="material-icons text-info mr-2">person</i>
              {t("All Reports")}
            </Link>
    )}
    
    {localStorage.getItem("role") === "LAB" && (
            <Link
              className="dropdown-item d-flex p-2"
              to={`/users`}
              onClick={() => setMenuVisible(false)}
            >
              <i className="material-icons text-info mr-2">person</i>
              {t("Patients")}
            </Link>
    )}
                {localStorage.getItem("role") !== "LAB" && (
              <Link
                className="dropdown-item d-flex p-2"
                to={`/myreports`}
                onClick={() => setMenuVisible(false)}
              >
                <i className="material-icons text-info mr-2">person</i>
                {t("My Reports")}
              </Link>
            )}
            <span
              className="dropdown-item d-flex p-2"
              onClick={onLogoutSuccess}
              style={{ cursor: "pointer" }}
            >
              <i className="material-icons text-danger mr-4">
                power_settings_new
              </i>
              {t("Logout")}
            </span>
          </div>
        </li>
      </ul>
    );
  }

  return (
    <div className="shadow-sm ng-light mb-2">
      <nav className="navbar navbar-light container navbar-expand">
          <img src={logo} alt="Lab Logo" />
        {links}
      </nav>
    </div>
  );
};

export default TopBar;
