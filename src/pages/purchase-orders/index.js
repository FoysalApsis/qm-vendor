import React, { useCallback, useEffect, useState } from "react";
import MainLayout from "../../components/layout/mainLayout";
import PoTable from "./PoTable";
import SectionHeading from "../../components/layout/SectionHeading";
import PoTable2 from "./PoTable2";
import InvoiceDatagridTable from "../Invoice/invoiceDatagridTable";


const MyPurchaseOrder = () => {
 
  return (
    <MainLayout pageTitle={"My Purchase Orders"}>
        <SectionHeading title={"My Purchase Orders"} divider={false} ></SectionHeading>

   
      {/* <PoTable></PoTable> */}
      {/* <div className="m-5"></div> */}
      <PoTable2></PoTable2>
      {/* <InvoiceDatagridTable></InvoiceDatagridTable> */}
      {/* <TestTable></TestTable> */}
    </MainLayout>
  );
};

export default MyPurchaseOrder;
