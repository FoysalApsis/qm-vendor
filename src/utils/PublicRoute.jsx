import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/authContext/AuthContext";

const PublicRoute = ({ children, restricted }) => {
  const { isLogin } = useContext(AuthContext);

  return isLogin && restricted ? <Navigate to="/" /> : children;
};

export default PublicRoute;
