import { Box, Button, Card, CircularProgress, Typography } from "@mui/material";
import React, { useRef } from "react";
import CopyPageLayout from "./copyPageLayout";
import Navbar from "../navbar/Navbar";

const MainLayout = ({
  children,
  pageTitle,
  buttonName,
  onButtonClick,
  loading,
}) => {
  const ref = useRef(null);
  return (
    <div style={{ backgroundColor: "#CFCFCF", position: "relative" }}>
      <div style={{ height: "239px", backgroundColor: "#6B1D73" }}></div>
      {/* <div style={{ height: "100vh", backgroundColor: "#CFCFCF" }}></div> */}
      <div style={{ position: "absolute", top: "10px", width: "100%" }}>
        <div style={{ width: "95%", margin: "auto" }}>
          <Navbar
          // handleDrawerToggle={handleDrawerToggle}
          />
        </div>
      </div>
      <div style={{ position: "absolute", top: "100px", width: "100%" }}>
        <div style={{ width: "95%", margin: "auto" }}>
          <div className="main-container mb-24">
            <CopyPageLayout />
            {/* <PageHeader title={'Purchase Orders'} > </PageHeader> */}
            <Card className="w-full py-[24px] px-[68px]">
              <div className="flex justify-between items-middle">
                <span className="pb-[20px] page-title segoe-bold">
                  {pageTitle}
                </span>
                <div>
                  {buttonName && (
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      onClick={onButtonClick}
                      className="h-8 segoe-normal capitalize"
                      style={{
                        backgroundColor: "#6B1D73",
                        textTransform: "capitalize",
                      }}
                      startIcon={
                        loading && (
                          <CircularProgress color="inherit" size={"16px"} />
                        )
                      }
                    >
                      {buttonName}
                    </Button>
                  )}
                  <span></span>
                </div>
              </div>
              {children}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
