import axios from "axios";

export const signup = (body) => {
  return axios.post("/api/users", body);
};

export const changeLanguage = (language) => {
  axios.defaults.headers["accept-language"] = language;
};

export const login = (creds) => {
  return axios.post(
    "/api/auth",
    {},
    {
      auth: {
        username: creds.username,
        password: creds.password,
      },
    }
  );
};

export const getAllUsers = (page=0,size=3) => {
  return axios.get(`/api/users?page=${page}&size=${size}`);
}

export const setAuthorizationHeader = ({username,password,isLoggedIn}) => {
  if(isLoggedIn) {
    const authorizationHeaderValue = `Basic ${btoa(username + `:` + password)}`;
    axios.defaults.headers["Authorization"] = authorizationHeaderValue;
  } else {
    delete axios.defaults.headers['Authorization'];
  }
 
}
