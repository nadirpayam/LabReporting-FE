import React, { useEffect, useState } from "react";
import Input from "../shared/Input";
import { useTranslation } from "react-i18next";
import ButtonProgress from "../shared/ButtonProgress";
import { useApiProgress } from "../shared/apiProgress";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginHandler, loginSuccess } from "../../redux/authActions";
import SecureLS from "secure-ls";

const UserLoginPage = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const ls = new SecureLS();
  const dispatch = useDispatch();

  useEffect(() => {
    setError(undefined);
  }, [username, password]);

  const onClickLogin = async (event) => {
    event.preventDefault();
    const creds = {
      username,
      password,
    };

    const { history } = props;
    const { push } = history;

    setError(undefined);
    try {
      const result = await dispatch(loginHandler(creds));
      console.log(result.data);
      {
        localStorage.setItem("email", result.data.email);
        localStorage.setItem("hospitalNO", result.data.hospitalNO);
        localStorage.setItem("name", result.data.name);
        localStorage.setItem("username", result.data.username);
        localStorage.setItem("role", result.data.role);
        localStorage.setItem("currentUser", result.data.userId);
      }

      localStorage.getItem("role") === "LAB"
        ? push("/reports")
        : push("/myreports");
    } catch (apiError) {
      setError(apiError.response.data.message);
    }
  };

  const { t } = useTranslation();
  const pendingApiCall = useApiProgress("post", "/api/auth");
  const buttonEnabled = username && password;
  return (
    <form onSubmit={event => event.preventDefault()}>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center" style={{marginTop:"75px"}}>
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-2">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        {t("Login")}
                      </p>

                      <form className="mx-1 mx-md-4">
                        <Input
                          type="text"
                          holder={t("Your Username")}
                          onChange={(event) => {
                            setUsername(event.target.value);
                          }}
                        />

                        <Input
                          type="password"
                          holder={t("Your Password")}
                          onChange={(event) => {
                            setPassword(event.target.value);
                          }}
                        />
                        {error && (
                          <div className="alert alert-danger" role="">
                            {error}
                          </div>
                        )}
                        <div class="form-check d-flex justify-content-center mb-5">
                          <label class="form-check-label" for="form2Example3">
                            {t("LoginYonu")}
                            <Link
                              to="/register"
                              className="dtext-white-50 fw-bold"
                            >
                              {t("Sign Up")}
                            </Link>
                          </label>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <ButtonProgress
                            onClick={onClickLogin}
                            disabled={!buttonEnabled || pendingApiCall}
                            pendingApiCall={pendingApiCall}
                            text={t("Login")}
                          />
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-1">
                      <img
                        src="./Images/yes.jpg"
                        classNameName="img-fluid"
                        alt="Sample image"
                        style={{ width: "600px", height: "400px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
};

export default UserLoginPage;
