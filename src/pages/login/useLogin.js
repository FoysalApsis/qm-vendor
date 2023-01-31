import { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as Yup from "yup";
import serverAPI from "../../config/serverAPI";
import AuthContext from "../../context/authContext/AuthContext";
import errorHandle from "../../utils/errorHandle";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const useLogin = () => {

  const { Login } = useContext(AuthContext);
  const navigate = useNavigate();
  const defaultState = {
    email: "",
    password: "",
  };

  const login_params = {
    "db": process.env.REACT_APP_DB,
    "login": process.env.REACT_APP_LOGIN,
    "password": process.env.REACT_APP_PASSWORD,
  }

  const SignInValidations = Yup.object().shape({
    email: Yup.string().required("Username is required!"),
    // password: Yup.string().required("Password is required!"),
  });


  const PostLogin = async (data) => {
    const res = {jsonrpc:"2.0",params:{...data}}
    return await serverAPI.post("/auth-vendor", res, {});  
  };

  // getHeader();
  const Mutation = useMutation(PostLogin, {
    onSuccess: (data) => {
      // if (data?.data?.result?.response?.length >0) {
      //   const LoggedIn = Login(data?.data?.result?.response);
      //   if (LoggedIn) {
      //     navigate("/");
      //   }
      // }
      if (data?.data?.length >0) {
        const LoggedIn = Login(data?.data);
        if (LoggedIn) {
          navigate("/");
        }
      }
      else{
        toast.error(`Credentials are incorrect`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        localStorage.removeItem("token");
        localStorage.removeItem("userObj");
        // window.location.replace(`${process.env.REACT_APP_FE_URL}/sign-in`);
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
