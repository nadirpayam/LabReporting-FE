import React, { Component, useTransition, useState } from "react";
import { signup, changeLanguage } from "../shared/apiCalls";
import Input from "../shared/Input";
import { useTranslation } from "react-i18next";
import ButtonProgress from "../shared/ButtonProgress";
import { useApiProgress } from "../shared/apiProgress";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupHandler, loginSuccess } from "../../redux/authActions";

const UserSignupPage = (props) => {
  
  const [form,setForm] = useState({
    name: null,
    surname: null,
    identity: null,
    email: null,
    username: null,
    password: null,
    repeat: null,
    pendingApiCall: false,
  });

  const [error, setError] = useState({});

  const dispatch = useDispatch();



  const onChange = (event) => {
    const { name, value } = event.target;
    setError((previousError)=>({... previousError,[name]:undefined}));
    setForm((previousForm) => ({...previousForm,[name]:value}));
  };

  const onClickSignup = async (event) => {
    event.preventDefault();
    const { history } = props;
    const { push } = history;

    const { name, surname, username, email, password, identity } = form;

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
        setError( error.response.data.validationErrors);
      }
    }
  };

  const {t} = useTranslation();
  const {name:nameError,username:usernameError,password:passwrodError,email:emailError,identity:identityError,surname:surnameError} = error;
  const pendingApiCallSignup = useApiProgress("post","/api/users");
  const pendingApiCallLogin = useApiProgress("post","/api/auth");

  const pendingApiCall = pendingApiCallLogin || pendingApiCallSignup;

  let repeatError;
  if(form.password!==form.repeat) {
    repeatError = t('Password mismatch');
  }



  return (
    <form>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
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
                          error={nameError}
                          holder={t("Your Name")}
                          onChange={onChange}
                        />
                        <Input
                          iname="surname"
                          type="text"
                          error={surnameError}
                          holder={t("Your Surname")}
                          onChange={onChange}
                        />
                        <Input
                          iname="email"
                          type="email"
                          error={emailError}
                          holder={t("Your Email")}
                          onChange={onChange}
                        />
                        <Input
                          iname="username"
                          type="text"
                          error={usernameError}
                          holder={t("Your Username")}
                          onChange={onChange}
                        />
                        <Input
                          iname="identity"
                          type="number"
                          error={identityError}
                          holder={t("Your Identity")}
                          onChange={onChange}
                        />
                        <Input
                          iname="password"
                          type="password"
                          error={passwrodError}
                          holder={t("Your Password")}
                          onChange={onChange}
                        />
                        <Input
                          iname="repeat"
                          type="password"
                          error={repeatError}
                          holder={t("Repeat Your Password")}
                          onChange={onChange}
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
                            onClick={onClickSignup}
                            disabled={pendingApiCall || repeatError !== undefined}
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
};




export default UserSignupPage;
