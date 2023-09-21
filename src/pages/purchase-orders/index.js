import React, { useCallback, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import serverAPI from "../../config/serverAPI";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import MainLayout from "../../components/layout/mainLayout";
import PoTable from "./PoTable";
import SectionHeading from "../../components/layout/SectionHeading";

const MyPurchaseOrder = () => {
 
  return (
    <MainLayout pageTitle={"My Purchase Orders"}>
        <SectionHeading title={"My Purchase Orders"} divider={false} ></SectionHeading>

   
      <PoTable></PoTable>
    </MainLayout>
  );
};

export default MyPurchaseOrder;
