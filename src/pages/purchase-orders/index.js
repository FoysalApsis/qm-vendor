import React, { useCallback, useEffect, useState } from "react";
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
