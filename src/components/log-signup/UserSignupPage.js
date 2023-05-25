import React, { Component, useTransition } from "react";
import { signup, changeLanguage } from "../shared/apiCalls";
import Input from "../shared/Input";
import { withTranslation } from "react-i18next";
import ButtonProgress from "../shared/ButtonProgress";
import { withApiProgress } from "../shared/apiProgress";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { signupHandler, loginSuccess } from "../../redux/authActions";

class UserSignupPage extends Component {
  state = {
    name: null,
    surname: null,
    identity: null,
    email: null,
    username: null,
    password: null,
    repeat: null,
    pendingApiCall: false,
    error: {},
  };

  onChange = (event) => {
    const { t } = this.props;
    const { name, value } = event.target;
    const error = { ...this.state.error };
    error[name] = undefined;
    if (name === "password" || name === "repeat") {
      if (name === "password" && value !== this.state.repeat) {
        error.repeat = t("Password mismatch");
      } else if (name === "repeat" && value !== this.state.password) {
        error.repeat = t("Password mismatch");
      } else {
        error.repeat = undefined;
      }
    }
    this.setState({
      [name]: value,
      error,
    });
  };

  onClickSignup = async (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { push } = history;

    const { name, surname, username, email, password, identity } = this.state;

    const body = {
      name, //key=value isimleri aynı olduğu için sadece bir tanesini yazdım normalde name=name yazılır
      surname,
      username,
      identity,
      email,
      password,
    };

    try {
      await dispatch(signupHandler(body));
      push("/addreport");
    } catch (error) {
      if (error.response.data.validationErrors) {
        this.setState({ error: error.response.data.validationErrors });
      }
    }
  };

  render() {
    const { error } = this.state;
    const { name, surname, email, identity, password, repeat, username } =
      error;
    const { t, pendingApiCall } = this.props;
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
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          {t("Sign Up")}
                        </p>

                        <form className="mx-1 mx-md-4">
                          <Input
                            iname="name"
                            type="text"
                            error={name}
                            holder={t("Your Name")}
                            onChange={this.onChange}
                          />
                          <Input
                            iname="surname"
                            type="text"
                            error={surname}
                            holder={t("Your Surname")}
                            onChange={this.onChange}
                          />
                          <Input
                            iname="email"
                            type="email"
                            error={email}
                            holder={t("Your Email")}
                            onChange={this.onChange}
                          />
                          <Input
                            iname="username"
                            type="text"
                            error={username}
                            holder={t("Your Username")}
                            onChange={this.onChange}
                          />
                          <Input
                            iname="identity"
                            type="number"
                            error={identity}
                            holder={t("Your Identity")}
                            onChange={this.onChange}
                          />
                          <Input
                            iname="password"
                            type="password"
                            error={password}
                            holder={t("Your Password")}
                            onChange={this.onChange}
                          />
                          <Input
                            iname="repeat"
                            type="password"
                            error={repeat}
                            holder={t("Repeat Your Password")}
                            onChange={this.onChange}
                          />

                          <div class="form-check d-flex justify-content-center mb-5">
                            <label class="form-check-label" for="form2Example3">
                              {t("RegisterYonu")}
                              <Link
                                to="/login"
                                className="dtext-white-50 fw-bold"
                              >
                                {t("Login")}
                              </Link>
                            </label>
                          </div>

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <ButtonProgress
                              onClick={this.onClickSignup}
                              disabled={pendingApiCall || repeat !== undefined}
                              pendingApiCall={pendingApiCall}
                              text={t("Sign Up")}
                            />
                          </div>
                        </form>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
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

const UserSignupPageWithApiProgressForSignupRequest = withApiProgress(
  UserSignupPage,
  "/api/users"
);

const UserSignupPageWithApiProgressForAuthRequest = withApiProgress(
  UserSignupPageWithApiProgressForSignupRequest,
  "/api/auth"
);


const UserSignupPageWithTranslation = withTranslation()(
  UserSignupPageWithApiProgressForAuthRequest
);

export default connect()(UserSignupPageWithTranslation);
