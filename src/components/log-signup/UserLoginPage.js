import React, { Component, useTransition } from "react";
import Input from "../shared/Input";
import { withTranslation } from "react-i18next";
import ButtonProgress from "../shared/ButtonProgress";
import { withApiProgress } from "../shared/apiProgress";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginHandler, loginSuccess } from "../../redux/authActions";

//import {Authentication} from "../shared/AuthenticationContext";

class UserLoginPage extends Component {
  //static contextType = Authentication;
  state = {
    username: "",
    password: "",
    error: null,
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      error: null,
    });
  };

  onClickLogin = async (event) => {
    event.preventDefault();
    const { password, username } = this.state;
    const creds = {
      username,
      password,
    };

    const { history, dispatch } = this.props;
    const { push } = history;
    this.setState({
      error: null,
    });
    try {
      await dispatch(loginHandler(creds));
      push("/user");
    } catch (apiError) {
      this.setState({
        error: apiError.response.data.message,
      });
    }
  };

  render() {
    const { t, pendingApiCall } = this.props;
    const { username, password, error } = this.state;
    const buttonEnabled = username && password;
    return (
      <form>
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div
                  className="card text-black"
                  style={{ borderRadius: "25px" }}
                >
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-2">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          {t("Login")}
                        </p>

                        <form className="mx-1 mx-md-4">
                          <Input
                            iname="username"
                            type="text"
                            holder={t("Your Username")}
                            onChange={this.onChange}
                          />

                          <Input
                            iname="password"
                            type="password"
                            holder={t("Your Password")}
                            onChange={this.onChange}
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
                              onClick={this.onClickLogin}
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
  }
}

const UserLoginPageWithTranslation = withTranslation()(UserLoginPage);

export default connect()(
  withApiProgress(UserLoginPageWithTranslation, "/api/auth")
);
