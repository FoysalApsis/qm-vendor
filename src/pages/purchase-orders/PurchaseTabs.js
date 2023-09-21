import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React, { useState } from 'react'
import Products from "./Products";


const PurchaseTabs = ({data,total}) => {
    const [value, setValue] = useState("1");
    return (
        <>
    
          <TabContext value={value}>
            <TabList
            //   onChange={handleTabChange}
              aria-label="lab API tabs example"
              indicatorColor="primary"
              // sx={{color:'#0D3875'}}
            >
              <Tab label="Products" value="1" 
              style={{color:'#0D3875'}}
              />
              {/* <Tab label="Purchase Information" value="2" />
              <Tab label="Accounting Information" value="3" /> */}
            </TabList>
    

             <TabPanel value="1" sx={{padding:"24px 0px"}}>
              <Products
                data = {data}
                total={total}
               
              />
            </TabPanel>
          </TabContext>
      
        </>
      );
}

export default PurchaseTabs
