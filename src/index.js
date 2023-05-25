import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./i18n";
//import AuthenticationContext from "./components/shared/AuthenticationContext";
import {Provider} from "react-redux";
import {createStore} from 'redux';
import configureStore from "./redux/configureStore";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = configureStore();

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);


