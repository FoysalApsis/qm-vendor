import { useMediaQuery } from "@mui/material";
import React from "react";
import { Spinner } from "react-bootstrap";

const FullSpinner = ({forcefullscreen}) => {
  const isMobile = useMediaQuery("(max-width:900px)");
  return (
    <div
      style={{
        width: `${(isMobile || forcefullscreen) ? "100%" : "calc(100% - 310px)"}`,
        height: "100%",
        top: "0",
        right: "0",
        bottom: "0",
        position: "absolute",
        zIndex: "7",
        background: "rgba(0,0,0,0.5)",
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <Spinner animation="border" variant="warning" />
    </div>
  );
};

export default FullSpinner;
