import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import useLoginMSAL from "./useLoginMSAL";
import MedelaLogo from "../../images/MedelaLogo.png";
import Parking from "../../images/parking.png";
import Leaf from "../../images/Leaf.png";
import FullSpinner from "../../components/layout/FullSpinner";
import "../login/Login.scss";
import { toast } from "react-toastify";

import { config } from "./Config";
import { normalizeError, getUserProfile } from "./utils/MSUtils";

import { UserAgentApplication } from "msal";

const userAgentApplication = new UserAgentApplication({
  auth: {
    clientId: config.clientId,
    redirectUri: config.redirectUri,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true,
  },
});

const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const LoginMSAL = ({ isTab }) => {
  const { SignInValidations, defaultState, mutate } = useLoginMSAL();
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    localStorage.clear();
    sessionStorage.clear();
    try {
      setIsLoading(true);
        // loginPopup or loginRedirect
      await userAgentApplication.loginPopup({
        scopes: config.scopes,
        prompt: "select_account",
      });      
      const user = await getUserProfile(userAgentApplication, config.scopes);
      localStorage.setItem("userObjectMsal", JSON.stringify(user));
      let msalSessions = [];
      const sessionStorage = window.sessionStorage;
      Object.keys(sessionStorage).map(function (obj, key) {
        if (
          isJsonString(obj) &&
          JSON.parse(obj).clientId === process.env.REACT_APP_AZURE_APP_CLIENT_ID &&
          JSON.parse(window.sessionStorage.getItem(obj)).accessToken !== JSON.parse(window.sessionStorage.getItem(obj)).idToken
        ) {
          return msalSessions.push(
            JSON.parse(window.sessionStorage.getItem(obj))
          );
        }
        return undefined;
      });
      await mutate(
        {
          email: user.mail || user.userPrincipalName,
          msalSessions,
        },
        {}
      );
      // setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.error(normalizeError(err).message, {
        variant: "error",
        preventDuplicate: true,
      });
    }
  };

  return (
    <Grid container className="login">
      {isLoading && <FullSpinner forcefullscreen={true}/>}
      <Grid container className="login-head">
        <img
          src={MedelaLogo}
          className="mb-4 "
          height="50px"
          width="250px"
          alt="medela logo"
        />
        <h3>
          {isTab
            ? "Parking Solution"
            : "Medela AG – Lättich parking ticket reimbursement"}
        </h3>
      </Grid>
      <Grid container className="login-section">
        <Grid item xs={12} className="car-section">
          <img src={Parking} className="parking-image" alt="car parking pic" />
        </Grid>
        <Grid item xs={12} className="form-section">
            <span style={{ width: "260px" }}>
                <button type="button" onClick={() => login()} className="btn btn-primary">
                    SIGN IN
                </button>
            </span>          
        </Grid>
        <img src={Leaf} alt="leaf pic" className="leaf-img" />
        <span className="login-footer" />
      </Grid>
    </Grid>
  );
};

export default LoginMSAL;
