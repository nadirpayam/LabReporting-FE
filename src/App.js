import './App.css';
import React from 'react';
import {withApiProgress} from "../src/components/shared/apiProgress"
import UserSignupPage from "../src/components/log-signup/UserSignupPage"
import UserLoginPage from './components/log-signup/UserLoginPage';
import { BrowserRouter as Routes,Switch, Route, Link } from "react-router-dom";
import AddReport from './components/laborant/AddReport';
import TopBar from './components/topbar/TopBar';
import LanugageSelector from './components/shared/LanugageSelector';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import UserPage from './components/user/UserPage';
import {connect} from "react-redux";
//import {Authentication} from "../src/components/shared/AuthenticationContext";

class App extends React.Component {
//static contextType=Authentication;
 
  render() {
    const {isLoggedIn}=this.props;

    return (
      <Routes>
      <TopBar/>
      <LanugageSelector/>
    <Switch>
      <Route exact path="/" component={AddReport}/>
    {!isLoggedIn &&  (<Route path="/login" component={UserLoginPage}/> )}
      <Route path="/register" component={UserSignupPage}/>
      <Route path="/addreport" component={AddReport }/>
      <Route path="/user/:username" component={UserPage}/>
      <Redirect to="/addreport"/>
    </Switch>
  </Routes>
    );
  }
  
}

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.isLoggedIn
    };
};

export default connect(mapStateToProps)(App);