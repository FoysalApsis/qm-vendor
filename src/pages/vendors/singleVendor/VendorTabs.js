import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import SalesAndPurchase from "./SalesAndPurchase";
import ContactAddress from "./ContactAddress";
import Accounting from "./Accounting";

const VendorTabs = (props) => {
  const { data, setData, handleChange,paymentTerm,setPaymentTerm } = props;
  const [value, setValue] = useState("1");
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <TabContext value={value}>
        <TabList
          onChange={handleTabChange}
          aria-label="lab API tabs example"
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="Contacts" value="1" />
          <Tab label="Purchase Information" value="2" />
          <Tab label="Accounting Information" value="3" />
        </TabList>

        <TabPanel value="1">
          <ContactAddress
            setData={setData}
            data={data}
            handleChange={handleChange}
          />
        </TabPanel>
        <TabPanel value="2">
          <SalesAndPurchase
            setData={setData}
            data={data}
            handleChange={handleChange}
            paymentTerm={paymentTerm}
            setPaymentTerm={setPaymentTerm}
          />
        </TabPanel>
        <TabPanel value="3">
          <Accounting
            setData={setData}
            data={data}
            handleChange={handleChange}
          />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default VendorTabs;
