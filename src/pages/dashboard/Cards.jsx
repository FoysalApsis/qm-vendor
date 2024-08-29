import { Box, Card, CardContent, Table, Typography } from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const DashboardCards = ({ children, title, icon:Icon, navigate }) => {
  return (
    <>
    <Card style={{ marginRight: "20px", backgroundColor:"#FAFAFA" }} className="bg-[#FAFAFA]" >
      <CardContent className="bg-[#FAFAFA]">
        <Box className="flex justify-between">
          <div className="flex">

            <Icon/>
            <Typography
              sx={{ fontSize: 14 }}
              className="text-secondaryColor segoe-bold me-5 ms-2 cursor-pointer"
              gutterBottom
              onClick={navigate}
            >
              {title}
            </Typography>
          </div>
          {/* <ArrowForwardIcon className="cursor-pointer" onClick={navigate}></ArrowForwardIcon> */}
        </Box>
        <Box className="flex items-center justify-center py-2 cursor-pointer" onClick={navigate}>{children}</Box>
      </CardContent>
    </Card>

    </>
  );
};

export default DashboardCards;
