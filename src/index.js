import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserSignupPage from "./components/log-signup/UserSignupPage";
import "./i18n";
import UserLoginPage from "./components/log-signup/UserLoginPage";
import LanugageSelector from "./components/shared/LanugageSelector";
import {BrowserRouter as RouteYolu,Route,Redirect,Switch} from 'react-router-dom'
import AddReport from "./components/laborant/AddReport";
import TopBar from "./components/topbar/TopBar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouteYolu>
    <TopBar/>
    <LanugageSelector/>
  <Switch>
    <Route exact path="/" component={UserLoginPage}/>
    <Route path="/login" component={UserLoginPage }/>
    <Route path="/register" component={UserSignupPage}/>
    <Route path="/addreport" component={AddReport }/>
  </Switch>
</RouteYolu>
);
