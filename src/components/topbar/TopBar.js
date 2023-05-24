import React, { Component } from 'react';
import logo from "../assets/report.ico";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LanugageSelector from '../shared/LanugageSelector';
import { withTranslation } from "react-i18next";


class TopBar extends Component {

    render() {
        const {t} = this.props;

        return (
          <div className='shadow-sm ng-light mb-2'>
            <nav className='navbar navbar-light container navbar-expand'>
                <Link className='navbar-brand' to="/">
                    <img src={logo} alt="Lab Logo"/>
                </Link>
                 <ul className="navbar-nav ml-auto">
                    <li><Link className='nav-link' to="/login"> {t('Login')}</Link></li>
                    <li><Link className='nav-link' to="/register"> {t('Sign Up')}</Link></li>
                 </ul>
            </nav>
          </div>
        );
    }
}

export default withTranslation()(TopBar);