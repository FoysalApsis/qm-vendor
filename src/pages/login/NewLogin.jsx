import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import useLogin from "./useLogin";
import QmLogo from "../../images/respond.png";
import InvoiceLogo from "../../images/rafiki.png";
import QmLines from "../../images/QMlines.png";
import { ErrorMessage, Field, Formik,Form } from "formik";


const NewLogin = () => {
  const { SignInValidations, defaultState, mutate } = useLogin();

  return (
    <Box className="h-[100vh] grid place-content-center bg-primaryColor">
      <img src={QmLines} className="absolute z-0 top-0 w-1/2"/>
      <Card className="w-[500px] z-10 ">
        <CardContent className="flex flex-col w-4/5 m-auto">
          {/* <Box className="m-auto">
            <img src={InvoiceLogo} alt="" />
          </Box> */}
          <Box className="flex flex-col justify-start mt-9">
            <Typography className="!text-base">Welcome back</Typography>
            <Typography fontWeight={700} className="!text-3xl">Login to your account</Typography>
          </Box>
          <Box className="flex flex-col justify-start mt-7">
          <Formik
            initialValues={{
              ...defaultState,
            }}
            validationSchema={SignInValidations}
            onSubmit={async (values, { resetForm }) => {
              mutate(values, { onSuccess: () => resetForm() });
            }}
          >
            <Form >
              <Typography className="mb-2">Email</Typography>
              <Field
                name="email"
                type="email"
                className="form-control mb-2 bg-[#F9FCFD]"
                placeholder="Username"
              />
              <ErrorMessage
                name="email"
                render={(msg) => (
                  <div style={{ color: "red", marginBottom: "5px" }}>{msg}</div>
                )}
              />
              <Typography className="mb-2 mt-3">Password</Typography>
              <Field
                name="password"
                type="password"
                className="form-control mb-2 bg-[#F9FCFD]"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                render={(msg) => (
                  <div style={{ color: "red", marginBottom: "5px" }}>{msg}</div>
                )}
              />
              <Button type="submit" color="secondary" variant="contained" className="mt-4 w-full !text-base !capitalize !bg-primaryColor">
                Login
              </Button>
            </Form>
          </Formik>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NewLogin;
