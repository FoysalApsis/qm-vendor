import { Box, Button, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import useLogin from "./useLogin";
import QmLogo from "../../images/respond.png";
import InvoiceLogo from "../../images/rafiki.png";
import QmLines from "../../images/QMlines.png";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext/AuthContext";
import { toast } from "react-toastify";
import serverAPI from "../../config/serverAPI";

const NewLogin = () => {
  const { Login } = useContext(AuthContext);
  const { SignInValidations, defaultState, mutate } = useLogin();
  const [authState, setAuthState] = useState(false);
  const navigate = useNavigate();
  const googleLogin = useCallback(
    async (arg) => {
      await serverAPI
        .post(`authenticate`, arg)
        .then((res) => {
          console.log(res)
         if(res?.data?.success){
          console.log("first")
          localStorage.setItem('userObj',JSON.stringify(res?.data?.response[0]))
          localStorage.setItem('token',"a")
          navigate('/')
         }
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    []
  );
  useEffect(()=>{
    const body = {jsonrpc:'2.0',params:{
      idToken:window.location.href.split('token=')[1],
      id:window.location.href.split('id=')[1].split('&&')[0],
      email:window.location.href.split('email=')[1].split('&&')[0]
    }}
    console.log(body)
    googleLogin(body)
  },[])

  return (
    // <Box className="h-[100vh] grid place-content-center bg-primaryColor">
    //   <img src={QmLines} className="absolute z-0 top-0 w-1/2" />
    //   <Card className="w-[500px] z-10 ">
    //     <CardContent className="flex flex-col w-4/5 m-auto">
    //       {/* <Box className="m-auto">
    //         <img src={InvoiceLogo} alt="" />
    //       </Box> */}
    //       <Box className="flex flex-col justify-start mt-9">
    //         <Typography className="!text-base">Welcome back</Typography>
    //         <Typography fontWeight={700} className="!text-3xl">
    //           {authState ? (
    //             <span>Two&nbsp;-&nbsp;factor&nbsp;authentication</span>
    //           ) : (
    //             "Login to your account"
    //           )}
    //         </Typography>
    //       </Box>
          
    //       <Box className="flex flex-col justify-start mt-7">
    //         <Formik
    //           initialValues={{
    //             ...defaultState,
    //           }}
    //           validationSchema={SignInValidations}
    //           onSubmit={async (values, { resetForm }) => {
    //             if (values?.auth_code != "" && values.auth_code != undefined ) {
    //               delete values["password"];
    //             } else {
    //               delete values["auth_code"];
    //             }
    //             // if(values?.auth_code?.length >= 0 ){
    //             //   delete values['auth_code']
    //             // }else{
    //             //   delete values["password"];
    //             // }
    //             mutate(values, {
    //               onSuccess: (data) => {
    //                 if (authState) {
    //                   if (data?.data?.length > 0) {
    //                     // if (LoggedIn) {
    //                     //   navigate("/");

    //                     // }
    //                     const LoggedIn = Login(data?.data);
    //                     if (LoggedIn) {
    //                       navigate("/");
    //                     }
    //                   } else {
    //                     // toast.error(`Credentials are incorrect`, {
    //                     //   position: "top-right",
    //                     //   autoClose: 5000,
    //                     //   hideProgressBar: false,
    //                     //   closeOnClick: true,
    //                     //   pauseOnHover: true,
    //                     //   draggable: true,
    //                     // });
    //                     localStorage.removeItem("token");
    //                     localStorage.removeItem("userObj");
    //                   }
    //                 }
    //                 if(data?.data?.length > 0){

    //                   setAuthState(true);
    //                 }
    //                 // console.log(data,"success")
    //                 // setAuthState(true);

    //               },
    //             });
    //           }}
    //         >
    //           <Form>
    //             {!authState && (
    //               <>
    //                 <Typography className="mb-2">Email</Typography>
    //                 <Field
    //                   name="email"
    //                   type="email"
    //                   className="form-control mb-2 bg-[#F9FCFD]"
    //                   placeholder="Username"
    //                 />
    //                 <ErrorMessage
    //                   name="email"
    //                   render={(msg) => (
    //                     <div style={{ color: "red", marginBottom: "5px" }}>
    //                       {msg}
    //                     </div>
    //                   )}
    //                 />
    //                 <Typography className="mb-2 mt-3">Password</Typography>
    //                 <Field
    //                   name="password"
    //                   type="password"
    //                   className="form-control mb-2 bg-[#F9FCFD]"
    //                   placeholder="Password"
    //                 />
    //                 <ErrorMessage
    //                   name="password"
    //                   render={(msg) => (
    //                     <div style={{ color: "red", marginBottom: "5px" }}>
    //                       {msg}
    //                     </div>
    //                   )}
    //                 />
    //               </>
    //             )}
    //             {authState && (
    //               <>
    //                 {" "}
    //                 <Typography className="mb-2">6-digit code</Typography>
    //                 <Field
    //                   name="auth_code"
    //                   type="text"
    //                   className="form-control mb-2 bg-[#F9FCFD]"
    //                   placeholder="6-digit code"
    //                 />
    //                 <ErrorMessage
    //                   name="auth_code"
    //                   render={(msg) => (
    //                     <div style={{ color: "red", marginBottom: "5px" }}>
    //                       {msg}
    //                     </div>
    //                   )}
    //                 />
    //               </>
    //             )}
    //             <Button
    //               type="submit"
    //               color="secondary"
    //               variant="contained"
    //               className="mt-4 w-full !text-base !capitalize !bg-primaryColor"
    //             >
    //               Login
    //             </Button>
    //           </Form>
    //         </Formik>
    //         <Box className="flex flex-col justify-start mt-4">
    //         <Typography className="!text-xs"> Please <a href="mailto:qmenv@example.com?Subject=Issue%20with%20vendor%20portal%20login" className="text-[#0a58ca]"> Contact Us </a> for login issues.</Typography>
    //       </Box>
    //       </Box>
    //     </CardContent>
    //   </Card>
    // </Box>

    // <Box className="h-[100vh] grid place-content-center bg-primaryColor">
    // <img src={QmLines} className="absolute z-0 top-0 w-1/2" />
    // <Card className="w-[500px] z-10 ">
    //   <CardContent className="flex flex-col justify-center items-center w-4/5 m-auto">
    //   <CircularProgress />

    //   </CardContent>
    // </Card>
    // </Box>
    <Box className="h-[100vh] grid place-content-center">
       <CircularProgress style={{transform:"scale(2.5)"}} />
    </Box>
  );
};

export default NewLogin;
