import React from "react";
import { Spinner } from "react-bootstrap";

const ComponentSizeSpinner = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        zIndex: "6",
        background: "rgba(0,0,0,0.4)",
        position: "absolute",
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <Spinner animation="border" variant="light" />
    </div>
  );
};

export default ComponentSizeSpinner;
