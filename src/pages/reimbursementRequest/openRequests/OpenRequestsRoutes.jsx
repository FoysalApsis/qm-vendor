import React from "react";
import { Route, Routes } from "react-router-dom";
import OpenRequests from ".";
import PageNotFound from "../../../components/layout/PageNotFound";
import Resubmit from "./resubmit";

const OpenRequestsRoutes = ({ isTab, isMobile }) => {
  return (
    <Routes>
      <Route path="/" element={<OpenRequests />} />
      <Route
        path="/resubmit/:id"
        element={<Resubmit isTab={isTab} isMobile={isMobile} />}
      />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default OpenRequestsRoutes;
