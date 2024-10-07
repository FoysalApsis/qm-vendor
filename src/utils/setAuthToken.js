import serverAPI from "../config/serverAPI";

const setAuthToken = (token) => {
  if (token) {
    serverAPI.defaults.headers.common["authorization"] = `Bearer ${token}`;
  } else {
    delete serverAPI.defaults.headers.common["authorization"];
  }
  if(localStorage.getItem('userObj')) {
    serverAPI.defaults.headers.common["user-email"] = JSON.parse(localStorage.getItem('userObj'))?.email;
    console.log('innnn auth token=====',JSON.parse(localStorage.getItem('userObj'))?.email,'===========',serverAPI.defaults.headers)
  }else {
    delete serverAPI.defaults.headers.common["user-email"];
  }
};

export default setAuthToken;
