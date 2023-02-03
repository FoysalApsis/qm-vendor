import React, { useState, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import serverAPI from "../../../config/serverAPI";
const SalesAndPurchase = (props) => {
  const { data, setData, handleChange,paymentTerm,setPaymentTerm,setPaymentTermOptions,paymentTermOptions  } = props;
  const [paymentMethod, setPaymentMethod] = useState(null);








  const paymentMethodOptions = [
    { label: "Manual", value: "Manual" },
    { label: "EFT", value: "EFT" },
    { label: "Checks", value: "Checks" },
  ];

  const handlePaymentTermChange = (event, values) => {
    setPaymentTerm(values);
  };
  const handlePaymentMethodChange = (event, values) => {
    setPaymentMethod(values?.value);
  };

  useEffect(() => {
    if (paymentTerm != null) {
      setData({
        ...data,
        property_supplier_payment_term_id: paymentTerm['id'],
      });
    }
    if (paymentMethod != null) {
      setData({
        ...data,
        paymentMethod: paymentMethod,
      });
    }
  }, [paymentTerm, paymentMethod]);





  return (
    <>
      <div className="row">
        <div className="mt-2">
          <div className="col-8">
            <div className="row">
              <div className="col-4 mt-2">
                <label htmlFor="paymentTerms">Payment Terms:</label>
              </div>
              <div className="col-6">
                <Autocomplete
                 size="small"
                  disablePortal
                  onChange={handlePaymentTermChange}
                  id="property_supplier_payment_term_id"
                  options={paymentTermOptions}
                  isOptionEqualToValue={(option, value) =>
                    option.label === value
                  }
                  sx={{ width: 300 }}
                  name="property_supplier_payment_term_id"
                  renderInput={(params) => (
                    <TextField {...params} label="Payment Terms" />
                  )}
                  value={Array.isArray(data?.property_supplier_payment_term_id)? data?.property_supplier_payment_term_id[1] : paymentTerm?.['label']}
                />
              </div>
            </div>
          </div>
          <div className="col-4"></div>
        </div>
        <div className="mt-2">
          {" "}
          <div className="col-8">
            <div className="row">
              <div className="col-4 mt-2">
                <label htmlFor="paymentTerms">Payment Method:</label>
              </div>
              <div className="col-6">
                <Autocomplete
                  disablePortal
                  size="small"
                  onChange={handlePaymentMethodChange}
                  id="Payment Method"
                  options={paymentMethodOptions}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  sx={{ width: 300 }}
                  name="paymentMethod"
                  renderInput={(params) => (
                    <TextField {...params} label="Payment Methods" />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="col-4"></div>
        </div>

      </div>
    </>
  );
};

export default SalesAndPurchase;
