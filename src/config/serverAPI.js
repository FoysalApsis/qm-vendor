import axios from "axios";

const serverAPI = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  
});

export default serverAPI;
