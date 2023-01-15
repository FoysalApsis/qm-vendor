import React from "react";
import "./PageHeader.scss";

const PageHeader = ({ title, children }) => {
  return (
    <div className={`pageHeader ps-3`}>
      <h6
        className="pageTitle m-0 font-medium d-flex"
        style={{ fontWeight: "700", paddingTop: "3px" }}
      >
        {title ? title : ""}
      </h6>
      <div
        className="d-flex align-items-center"
        style={{ height: "100%", minWidth: "110px" }}
      >
        {children}
      </div>
    </div>
  );
};

export default PageHeader;
