import serverAPI from "../config/serverAPI";

const setAuthToken = (token) => {
  if (token) {
    serverAPI.defaults.headers.common["authorization"] = `Bearer ${token}`;
  } else {
    delete serverAPI.defaults.headers.common["authorization"];
  }
};

export default setAuthToken;
