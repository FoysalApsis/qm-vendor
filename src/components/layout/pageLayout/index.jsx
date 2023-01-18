import { Drawer } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import SideBar from "../sideBar";

const PageLayout = () => {
  const location = useLocation();

  const [open, setOpen] = React.useState(
    location.pathname === "/" ? "Dashboard" : ""
  );

  const drawerWidth = 250;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    if (location.pathname.startsWith("/audit-trail")) setOpen("Audit Trail");
    if (location.pathname.startsWith("/reimbursement-request")) {
      if (open !== "Reimbursement Requests") {
        setOpen(
          (prev) =>
            prev !== "Reimbursement Requests" && "Reimbursement Requests"
        );
      }
    }
    if (location.pathname.startsWith("/settings")) setOpen("Settings");

    //eslint-disable-next-line
  }, [location.pathname]);

  const handleClick = (title) => {
    if (title === open) {
      setOpen("");
    } else {
      setOpen(title);
    }
  };

  return (
    <>
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      {/* <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
          zIndex: 10,
          boxShadow:
            "0px 1.2px 3.6px rgba(0, 0, 0, 0.11), 0px 6.4px 14.4px rgba(0, 0, 0, 0.13)",
        }}
        aria-label="mailbox folders"
      > */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { md: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            // backgroundColor: "#FAFAFA !important",
            position: "fixed",
            top: "59px",
            left: 0,
            height: "calc(100vh - 59px)",
            width: "100vw",
            border: "none",
            borderRadius: 0,
            zIndex: 4,
          },
          "& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop": {
            opacity: 0,
            backgroundColor: "transparent",
          },
        }}
      >
        <SideBar handleClick={handleClick} open={open} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block", lg: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            // backgroundColor: "#FAFAFA !important",
            height: "calc(100vh - 56px)",
            position: "fixed",
            top: "56px",
            left: 0,
            border: "none",
            zIndex: 4,
          },
        }}
        open
      >
        <SideBar handleClick={handleClick} open={open} />
      </Drawer>
      {/* </Box> */}
    </>
  );
};

export default PageLayout;
