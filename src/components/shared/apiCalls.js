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
