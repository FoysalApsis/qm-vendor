import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  console.log("123")
  const location = useLocation();
  const navigate = useNavigate();
  const loginTime = localStorage.getItem('loginTime');
  const currentTime = new Date().getTime();
  // const sixHours = 1 * 60 * 1000; 
  const sixHours = 6 * 60 * 60 * 1000; 
  // const url = `/sign-in?redirect=${location.pathname}${location.search}`;
  const url = `${process.env.REACT_APP_ANGULAR_API_URL}/auth/login`;
  useEffect(() => {
    if (!localStorage.getItem("token") || !localStorage.getItem("userObj")) {
      // navigate(url);
      window.location.href = `${process.env.REACT_APP_ANGULAR_API_URL}/auth/login`;
    }
    //eslint-disable-next-line
  }, [localStorage.getItem("token")]);

  useEffect(()=>{
    if(!localStorage.getItem("loginTime")){
      window.location.href = `${process.env.REACT_APP_ANGULAR_API_URL}/auth/login`;
    }
    if(currentTime - parseInt(loginTime) > sixHours){
      localStorage.removeItem("loginTime")
      window.location.href = `${process.env.REACT_APP_ANGULAR_API_URL}/auth/login`;
    }
  })
  return children;
};

export default PrivateRoute;
