import React, { useContext } from "react";
import { Navbar, Row, Col } from "react-bootstrap";

import DropDown from "./DropDown";
import logo from "../../../images/MedelaLogo.png";
import qmlogo from "../../../images/respond.png";
import { Avatar, IconButton, Stack, useMediaQuery } from "@mui/material";
import { GridMenuIcon } from "@mui/x-data-grid";
import AuthContext from "../../../context/authContext/AuthContext";

const NavbarContainer = ({ handleDrawerToggle }) => {
  const sideBar = useMediaQuery("(max-width: 900px)");
  const isTab = useMediaQuery("(max-width: 1100px)");
  const user = JSON.parse(localStorage.getItem("userObj"));
  
  return (
    // <></>
    <Navbar
      variant="light"
      style={{
        display: "inline-block",
        zIndex: "20 !important",
        width: "100%",
        height: "56px",
        boxShadow: `${sideBar ? " 0px 4px 4px rgba(0, 0, 0, 0.25)" : "none"}`,
        padding:"20px 70px",
        color:"#FFFFFF"
      }}
    >
      <Row
        md={12}
        className={`${
          sideBar
            ? "d-flex justify-content-between pe-1"
            : "d-flex justify-content-between"
        }`}
      >
        {/* <Col xs={2} md={2} lg={2} className="d-flex align-items-center">
          {!sideBar && (
            <Navbar.Brand href="/">
              <img
                src={qmlogo}
                width="75"
                height="36"
                style={{ marginLeft: "10%", width: "auto" }}
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Navbar.Brand>
          )}

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { md: "none" },
              marginLeft: "4px",
              color: "var(--blue)",
            }}
          >
            <GridMenuIcon />
          </IconButton>
        </Col> */}
        {!sideBar && (
          <Col
            xs={8}
            md={8}
            lg={8}
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <h5
              className="medium segoe-bold"
              style={{
                marginBottom: "0px",
                fontWeight: "700",
                textTransform: "uppercase",
                
              }}

            >
              QM Vendor Portal
            </h5>
          </Col>
        )}
        <Col
          xs={10}
          sm={10}
          md={2}
          lg={2}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-end"
            className="font-light segoe-normal"
            style={{
              fontSize: "0.75rem",
              marginRight: "10px",
              fontWeight: "500",
              width: `${isTab ? (sideBar ? "" : "130%") : "150%"}`,
            }}
          >
            <p className="text-truncate m-0" style={{ maxWidth: "100%" }}>
              Welcome
            </p>
            <p className="text-truncate m-0" style={{ maxWidth: "100%" }}>
            {user?.name ? user.name : "Username"}
            </p>
          </Stack>
          <DropDown>
            <Avatar
              sx={{
                width: 35,
                height: 35,
                marginRight: `15px`,
                color: "#fff",
                background: "#0094AA",
              }}
            />
          </DropDown>
        </Col>
      </Row>
    </Navbar>
  );
};

export default NavbarContainer;
