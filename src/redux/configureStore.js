import { Provider } from "react-redux";
import { createStore, applyMiddleware,compose } from "redux";
import authReducer from "./AuthReducer";
import SecureLS from "secure-ls";
import thunk from "redux-thunk";
import { setAuthorizationHeader } from "../components/shared/apiCalls";

const secureLS = new SecureLS();

const getStateFromStorage = () => {
  const labAuth = secureLS.get("lab-auth");

  let stateInLocalStorage = {
    isLoggedIn: false,
    username: undefined,
    role: undefined,
    image: undefined,
    password: undefined,
    email: undefined,
    name: undefined,
    surname: undefined,
  };

  if (labAuth) {
    return labAuth;
  }
  return stateInLocalStorage;
};

const updateStateInStorage = (newstate) => {
  secureLS.set("lab-auth", newstate);
};

const configureStore = () => {
  const initialState = getStateFromStorage();
  setAuthorizationHeader(initialState);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(authReducer, initialState, composeEnhancers(applyMiddleware(thunk)));


  store.subscribe(() => {
    updateStateInStorage(store.getState());
    setAuthorizationHeader(store.getState());
  });

  return store;
};

export default configureStore;
