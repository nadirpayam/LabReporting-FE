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


export const getOneUser = username => {
  return axios.get(`/api/users/${username}`);
}

export const updateUser = (username,body) => {
  return axios.put(`/api/users/${username}`,body);
} 

export const postReport = body => {
  return axios.post("/api/reports",body);
}

export const getReports = () => {
  return axios.get('/api/reports?userId='+localStorage.getItem("currentUser"));
}

export const updateReports = (reportId,body) => {
  return axios.put(`/api/reports/${reportId}`,body)
}

export const deleteReports = (reportId) => {
  return axios.delete(`/api/reports/${reportId}`)
}
