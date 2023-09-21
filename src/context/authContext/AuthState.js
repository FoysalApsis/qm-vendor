import React, { useEffect, useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import { SET_LOGIN, UNSET_LOGIN } from "../ActionTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import setAuthToken from "../../utils/setAuthToken";

const AuthState = ({ children }) => {
  const InitialState = {
    isLogin: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    // user: localStorage.getItem("userObj")
    //   ? JSON.parse(localStorage.getItem("userObj"))
    //   : null,
  };

  const [state, dispatch] = useReducer(AuthReducer, InitialState);

  const Login = (data) => {
    setAuthToken(data?.access_token);
    // setCookie(data.session_id)
    localStorage.setItem("userObj", JSON.stringify(data[0]));
    localStorage.setItem("token", data?.access_token);
    dispatch({ type: SET_LOGIN, payload: data?.userObj });
    return true;
  };

  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const Logout = () => {
    // setAuthToken(null);
    
    // dispatch({ type: UNSET_LOGIN });
    // navigate("/sign-in");
    
    // location.pathname = "/";
    // location.search = "";
    // queryClient.removeQueries();
    // console.log(`${process.env.REACT_APP_ANGULAR_API_URL}/auth/login`)
    localStorage.clear()
    window.location.href=`${process.env.REACT_APP_ANGULAR_API_URL}/auth/login`

  };

  useEffect(() => {
    setAuthToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) queryClient.removeQueries();
    //eslint-disable-next-line
  }, [localStorage.getItem("token")]);

  return (
    <AuthContext.Provider
      value={{
        Login,
        Logout,
        isLogin: state.isLogin,
        user: state?.user,
        token: state?.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
