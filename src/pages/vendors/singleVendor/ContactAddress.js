import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import Contact from "./ContactAddressTypes/Contact";
import DeliveryAddress from "./ContactAddressTypes/DeliveryAddress";
import InvoiceAddress from "./ContactAddressTypes/InvoiceAddress";

const ContactAddress = (props) => {
  const { data, setData, handleChange } = props;
  const [value, setValue] = useState("contact");
  const handleTypeChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      {" "}
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleTypeChange}
        >
          <FormControlLabel value="contact" control={<Radio />} label="Contact" />
          <FormControlLabel value="invoice" control={<Radio />} label="Invoice Address" />
          <FormControlLabel value="delivery" control={<Radio />} label="Delivery Address" />
        </RadioGroup>
      </FormControl>
      {(() => {
        switch (value) {
          case 'contact':
            return <Contact handleChange={handleChange} setData={setData} data={data}/>
          case 'invoice':
            return <InvoiceAddress handleChange={handleChange} setData={setData} data={data}/>
          case 'delivery':
            return <DeliveryAddress handleChange={handleChange} setData={setData} data={data}/>
          default:
            return null
        }
      })()}
    </div>
  );
};

export default ContactAddress;
