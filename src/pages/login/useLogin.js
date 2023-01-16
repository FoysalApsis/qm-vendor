import { useContext,useEffect } from "react";
import { useMutation } from "react-query";
import * as Yup from "yup";
import serverAPI from "../../config/serverAPI";
import AuthContext from "../../context/authContext/AuthContext";
import errorHandle from "../../utils/errorHandle";
import { useNavigate } from "react-router-dom";
import setCookie from "../../utils/setCookie";
import Cookies from 'js-cookie'

const useLogin = () => {
  const { Login } = useContext(AuthContext);
  const navigate = useNavigate();
  const defaultState = {
    email: "",
    password:""
  };

  const data = {
    jsonrpc:"2.0",
    params:{
      "db":process.env.REACT_APP_DB,
      "login":process.env.REACT_APP_LOGIN,
      "password":process.env.REACT_APP_PASSWORD,
    }
  }

  const getSession = async()=>{
    const result = await serverAPI
      .post(`qm_vendor_api/`,data,
      {
        headers: {
          'Content-Type': 'application/json',
      }
      })
      .then((res) => {
        console.log(res);
        return res;
        
      })
      .catch((err) => {
        console.log(err.message);
      });

    if (result) {
      // console.log(result?.data?.result?.session_id);
      // setCookie(result?.data?.result?.session_id)
      Cookies.set('sid', result?.data?.result?.session?.sid)
    }
  }

  // useEffect(()=>{
  //   getSession()
  // },[])

  const SignInValidations = Yup.object().shape({
    email: Yup.string().required("Username is required!"),
    // password: Yup.string().required("Password is required!"),
  });

  const PostLogin = async (data) => {
    const res = {jsonrpc:"2.0",params:{...data}}
    console.log({res});
    await getSession();
    return await serverAPI.post("/auth-vendor", res, {
      headers: {
          'Content-Type': 'application/json',
          session_id: `${Cookies.get('sid')}`
      }, withCredentials: true
  });
  };

  // getHeader();
  const Mutation = useMutation(PostLogin, {
    onSuccess: (data) => {
      const LoggedIn = Login(data?.data?.data);
      if (LoggedIn) {
        // setAuthToken(data?.data?.data?.access_token);
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
