import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import "./DashboardBlock.scss";

const DashboardBlock = ({ title, count, bgColor, url, color }) => {
  if (!count || count === 0) {
    return <></>;
  }
  return (
    <Grid
      item
      lg={3}
      md={4}
      sm={4}
      xs={5}
      className="p-0 m-0 dashboardBlock"
      style={{
        background: `${bgColor}`,
      }}
    >
      <Link
        to={url ? url : "#"}
        style={{
          color: `${color ? color : "#fff"}`,
          height: "100%",
          width: "100%",
        }}
        className="text-decoration-none p-0 m-0"
      >
        <div className="dashboardTitle">
          <p style={{ textAlign: "center" }}> {title}</p>
        </div>
        <div className="dashboardCounter">{count ? count : "0"}</div>
      </Link>
    </Grid>
  );
};

export default DashboardBlock;
