import React from "react";
import "./PageFooter.scss";

const PageFooter = ({ children }) => {
  return (
    <div className="page-footer d-flex justify-content-end align-items-center ">
      {children}
    </div>
  );
};

export default PageFooter;
