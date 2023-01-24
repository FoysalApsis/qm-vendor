import React from "react";
import { Grid,Button } from "@mui/material";
import useLogin from "./useLogin";
import MedelaLogo from "../../images/MedelaLogo.png";
import QmLogo from "../../images/respond.png";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "./Login.scss";

const Login = ({ isTab }) => {
  const { SignInValidations, defaultState, mutate } = useLogin();
  return (
    <Grid container className="login">
      <Grid container className="login-head">
        <img
          src={QmLogo}
          className="mb-4 "
          height="100px"
          alt="medela logo"
        />
        <>
          {isTab
            ? <h3 style={{color:"#6c227c"}}>RESPOND.<span style={{color:"#4c9d2a"}}>RECLAIM.</span>RENEW.</h3>
            :  <h3 style={{color:"#6c227c"}}>RESPOND.<span style={{color:"#4c9d2a"}}>RECLAIM.</span>RENEW.</h3>}
        </>
       
      </Grid>

      <Grid container spacing={2} className="login-section">
        <Grid item xs={2} md={1} className="car-section">
        {/* <img src={Parking} className="parking-image" alt="car parking pic" /> */}
        </Grid>
        <Grid item xs={7} md={6} className="form-section">
        <Formik
            initialValues={{
              ...defaultState,
            }}
            validationSchema={SignInValidations}
            onSubmit={async (values, { resetForm }) => {
              mutate(values, { onSuccess: () => resetForm() });
            }}
          >
            <Form style={{ width: "260px",marginTop:"120px" }}>
              <Field
                name="email"
                type="email"
                className="form-control mb-2"
                placeholder="Username"
              />
              <ErrorMessage
                name="email"
                render={(msg) => (
                  <div style={{ color: "red", marginBottom: "5px" }}>{msg}</div>
                )}
              />
              <Field
                name="password"
                type="password"
                className="form-control mb-2"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                render={(msg) => (
                  <div style={{ color: "red", marginBottom: "5px" }}>{msg}</div>
                )}
              />
              <Button type="submit" color="secondary" variant="contained">
                SIGN IN
              </Button>
            </Form>
          </Formik>
        </Grid>
        <Grid item xs={2} md={4}>
        {/* <img src={Leaf} alt="leaf pic" className="leaf-img" /> */}
        <span className="login-footer" />
        </Grid>
      </Grid>
      
    </Grid>
  );
};

export default Login;
