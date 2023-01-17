import { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as Yup from "yup";
import serverAPI from "../../config/serverAPI";
import AuthContext from "../../context/authContext/AuthContext";
import errorHandle from "../../utils/errorHandle";
import { useNavigate } from "react-router-dom";

const useLogin = () => {

  const { Login } = useContext(AuthContext);
  const navigate = useNavigate();
  const defaultState = {
    email: "",
    password: "",
  };

  // const data = {
  //   jsonrpc:"2.0",
  //   params:{
  //     "db":process.env.REACT_APP_DB,
  //     "login":process.env.REACT_APP_LOGIN,
  //     "password":process.env.REACT_APP_PASSWORD,
  //   }
  // }
  const login_params = {
    "db": process.env.REACT_APP_DB,
    "login": process.env.REACT_APP_LOGIN,
    "password": process.env.REACT_APP_PASSWORD,
  }

  const SignInValidations = Yup.object().shape({
    email: Yup.string().required("Username is required!"),
    // password: Yup.string().required("Password is required!"),
  });

  // const GetVendors = async (data) => {
  //   const res = {jsonrpc:"2.0",params:{...data}}
  //   console.log({res});
  //   return await serverAPI.post("/auth-vendor", res);
  // };

  const PostLogin = async (data) => {
    const res = {jsonrpc:"2.0",params:{...data,login_params}}
    return await serverAPI.post("/auth-vendor", res, {});  
  };

  // getHeader();
  const Mutation = useMutation(PostLogin, {
    onSuccess: (data) => {
      const LoggedIn = Login(data?.data?.result?.response);
      if (LoggedIn) {
        navigate("/");
      }
    },
    onError: (err) => {
      errorHandle(err);
    },
  });
  return {
    SignInValidations,
    defaultState,
    mutate: Mutation.mutate,
  };
};

export default useLogin;
