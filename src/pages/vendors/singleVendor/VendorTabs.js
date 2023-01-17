import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import SalesAndPurchase from "./SalesAndPurchase";
import ContactAddress from "./ContactAddress";

const VendorTabs = (props) => {
  const { data, setData, handleChange } = props;
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
          <Tab label="Contacts & Addresses" value="1" />
          <Tab label="Sales & Purchase" value="2" />
          <Tab label="Accounting" value="3" />
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
          />
        </TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </>
  );
};

export default VendorTabs;
