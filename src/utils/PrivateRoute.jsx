import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // const url = `/sign-in?redirect=${location.pathname}${location.search}`;
  const url = `${process.env.REACT_APP_ANGULAR_API_URL}/auth/login`;
  useEffect(() => {
    if (!localStorage.getItem("token") || !localStorage.getItem("userObj")) {
      // navigate(url);
      window.location.href = `${process.env.REACT_APP_ANGULAR_API_URL}/auth/login`;
    }
    //eslint-disable-next-line
  }, [localStorage.getItem("token")]);

  return children;
};

export default PrivateRoute;
