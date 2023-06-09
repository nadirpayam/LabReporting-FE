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
import {useSelector} from "react-redux";
import Users from './components/laborant/Users';
import UserListItem from './components/user/UserListItem';
import UserList from './components/user/UserList';
import Home from './components/home/Home';
import MyReports from './components/user/MyReports';
import EditReport from './components/laborant/EditReport';
import OneReport from './components/user/OneReport';

const App = () => {

  const {isLoggedIn} = useSelector((store) => ({
    isLoggedIn:store.isLoggedIn
  }))
 

    return (
      <Routes>
      <TopBar/>
      <LanugageSelector/>
    <Switch>
      <Route exact path="/" component={UserLoginPage}/>
      {!isLoggedIn &&  (<Route path="/login" component={UserLoginPage}/> )}
      <Route path="/register" component={UserSignupPage}/>
      <Route path="/onereport" component={OneReport}/>
      <Route path="/reports" component={EditReport}/>
      <Route path="/users" component={UserList}/>
      <Route path="/addreport" component={AddReport}/>
      <Route path="/myreports" component={MyReports}/>
      <Route path="/user/:username" component={UserPage}/>
      <Redirect to="/register"/>
    </Switch>
  </Routes>
    );
  
}



export default App;