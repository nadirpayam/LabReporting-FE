import React, { Component } from "react";
import { signup } from "../shared/apiCalls";
import Input from "../shared/Input";

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
    errors: {},
  };

  onChange = (event) => {
    const {t} = this.props;
    const { name, value } = event.target;
    const errors = {...this.state.errors};
    errors[name] = undefined;
    if(name ==='password' || name==='repeat') {
      if(name==="password" && value!== this.state.repeat) {
        errors.repeat = 'Password mismatch';
      } else if(name==="repeat" && value!== this.state.password) {
        errors.repeat = 'Password mismatch';
      }else {
        errors.repeat = undefined;
      }
    }
    this.setState({
      [name]: value,
      errors
    });
  };

  onClickSignup = async (event) => {
    event.preventDefault();
    const { name,surname,identity, email,username,password} = this.state;

    const body = {
      name,surname,identity, email,username,password
    };
    this.setState({ pendingApiCall: true });

    try {
      const response = await signup(body);
    } catch (error) {
      if (error.response.data.validationErrors) {
        this.setState({ errors: error.response.data.validationErrors });
      }
    }

    this.setState({ pendingApiCall: false });
  };

  render() {
    const { pendingApiCall, errors } = this.state;
    const { username, name ,surname,email,identity,password,repeat} = errors;

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
                          Sign up
                        </p>

                       

                        <form className="mx-1 mx-md-4">

                         <Input iname="name" type="text" error={name} holder={'Your Name'} onChange={this.onChange} />
                         <Input iname="surname" type="text" error={surname} holder={'Your Surname'} onChange={this.onChange} />
                         <Input iname="email" type="email" error={email} holder={'Your Email'} onChange={this.onChange} />
                         <Input iname="username" type="text" error={username} holder={'Your Username'} onChange={this.onChange} />
                         <Input iname="identity" type="number" error={identity} holder={'Your Identity'} onChange={this.onChange} />
                         <Input iname="password" type="password" error={password} holder={'Your Password'}onChange={this.onChange} />
                         <Input iname="repeat" type="password" error={repeat} holder={'Repeat Your Password'} onChange={this.onChange} />
                         
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="button"
                              className="btn btn-primary btn-lg"
                              onClick={this.onClickSignup}
                              disabled={pendingApiCall || repeat!==undefined}
                            >
                              {pendingApiCall && (
                                <span className="spinner-border spinner-border-sm"></span>
                              )}
                              Register
                            </button>
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

export default UserSignupPage;
