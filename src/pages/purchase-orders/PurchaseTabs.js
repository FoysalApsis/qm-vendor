import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React, { useState } from 'react'
import Products from "./Products";


const PurchaseTabs = ({data}) => {
    const [value, setValue] = useState("1");
    console.log(data,"datatatatata");
    return (
        <>
    
          <TabContext value={value}>
            <TabList
            //   onChange={handleTabChange}
              aria-label="lab API tabs example"
              textColor="secondary"
              indicatorColor="secondary"
            >
              <Tab label="Products" value="1" />
              {/* <Tab label="Purchase Information" value="2" />
              <Tab label="Accounting Information" value="3" /> */}
            </TabList>
    

             <TabPanel value="1">
              <Products
                data = {data}
                // setData={setData}
                // data={data}
                // handleChange={handleChange}
                // titles={titles}
                // states={states}
                // countries={countries}
                // childs={childs}
                // handleClickOpen={handleClickOpen}
                // handleClose={handleClose}
                // open={open}
              />
            </TabPanel>
                        {/*
            <TabPanel value="2">
              <SalesAndPurchase
                setData={setData}
                data={data}
                handleChange={handleChange}
                paymentTerm={paymentTerm}
                setPaymentTerm={setPaymentTerm}
                paymentTermOptions={paymentTermOptions}
                setPaymentTermOptions={setPaymentTermOptions}
              />
            </TabPanel>
            <TabPanel value="3">
              <Accounting
                setData={setData}
                data={data}
                handleChange={handleChange}
                banks={banks}
              />
            </TabPanel> */}
          </TabContext>
      
        </>
      );
}

export default PurchaseTabs
