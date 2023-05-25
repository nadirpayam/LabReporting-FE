import * as ACTIONS from "./Constants";

const defaultState = {
    isLoggedIn: false,
    username:undefined,
    role:undefined,
    image:undefined,
    password:undefined,
    email:undefined,
    name:undefined,
    surname:undefined
   
}

const authReducer = (state={... defaultState},action) => {
if(action.type===ACTIONS.LOGOUT_SUCCESS) {
   return defaultState;
} else if(action.type===ACTIONS.LOGIN_SUCCESS) {
  return {
    ... action.payload,
    isLoggedIn:true
  };
}
  return state;
};

export default authReducer;