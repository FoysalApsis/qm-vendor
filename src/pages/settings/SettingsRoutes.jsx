import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ConfigureDelegation from "./configureDelegation";
import PageNotFound from "../../components/layout/PageNotFound";
import AuthContext from "../../context/authContext/AuthContext";
import SAPReporting from "./SAPReporting";

const SettingsRoutes = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.IsAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Routes>
      <Route path="/configure-delegation" element={<ConfigureDelegation />} />
      <Route path="/sap-reporting" element={<SAPReporting />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default SettingsRoutes;
