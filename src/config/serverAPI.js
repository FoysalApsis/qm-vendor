import axios from "axios";

const serverAPI = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  // headers: {
  //   db: process.env.REACT_APP_DB,
  //   User: process.env.REACT_APP_LOGIN,
  //   password: process.env.REACT_APP_PASSWORD,
  // },
});

export default serverAPI;
