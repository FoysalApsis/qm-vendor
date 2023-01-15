import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const url = `/sign-in?redirect=${location.pathname}${location.search}`;
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate(url);
    }
    //eslint-disable-next-line
  }, [localStorage.getItem("token")]);

  return children;
};

export default PrivateRoute;
