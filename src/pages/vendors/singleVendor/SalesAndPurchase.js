import React, { useState, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import serverAPI from "../../../config/serverAPI";
const SalesAndPurchase = (props) => {
  const {
    data,
    setData,
    handleChange,
    paymentTerm,
    setPaymentTerm,
    setPaymentTermOptions,
    paymentTermOptions,
    paymentMethod,
    setPaymentMethod,
    setPaymentMethodOptions,
    paymentMethodOptions

  } = props;
  // const [paymentMethod, setPaymentMethod] = useState(null);

  const handlePaymentTermChange = (event, values) => {
    setPaymentTerm(values);
  };
  const handlePaymentMethodChange = (event, values) => {
    setPaymentMethod(values);
  };


  useEffect(() => {
    if (paymentTerm != null ) {
      setData({
        ...data,
        property_supplier_payment_term_id: paymentTerm["id"],
      });
    }
    if (paymentMethod != null || paymentTerm != null ) {
      setData({
        ...data,
        property_payment_method_id: paymentMethod?.['id'],
        property_supplier_payment_term_id: paymentTerm?.["id"],
      });
    }
  }, [paymentTerm, paymentMethod]);


  return (
    <>
      <div className="row" style={{ maxWidth: "700px" }}>
          <div className="col-6">
            <div className="row">
              <div className="col-12 mt-2 segoe-bold">
                <label htmlFor="paymentTerms">Payment Terms:</label>
              </div>
              <div className="col-12">
                {/* <Autocomplete
                    readOnly

                  size="small"
                  disablePortal
                  onChange={handlePaymentTermChange}
                  id="property_supplier_payment_term_id"
                  options={paymentTermOptions}
                  sx={{ width: 300 }}
                  name="property_supplier_payment_term_id"
                  renderInput={(params) => (
                    <TextField {...params} label="Payment Terms" />
                  )}
                  value={
                    Array.isArray(data?.property_supplier_payment_term_id)
                      ? data?.property_supplier_payment_term_id[1]
                      : paymentTerm?.["label"]
                  }
                /> */}
                 <input
                    readOnly
                    type="text"
                    className="form-control"
                    id="property_supplier_payment_term_id"
                    name="property_supplier_payment_term_id"
                    // value={data?.email ? data?.email : ""}
                    value={
                      Array.isArray(data?.property_supplier_payment_term_id)
                        ? data?.property_supplier_payment_term_id[1]
                        : paymentTerm?.["label"]
                    }
                    // onChange={handleChange}
                  />
              </div>
            </div>

          {/* <div className="col-4"></div> */}
        </div>
        {/* <div className="mt-2"> */}
          {" "}
          <div className="col-6">
            <div className="row">
              <div className="col-12 mt-2 segoe-bold">
                <label htmlFor="paymentTerms">Payment Method:</label>
              </div>
              <div className="col-12">
                {/* <Autocomplete
                  disablePortal
                  size="small"
                  onChange={handlePaymentMethodChange}
                  id="property_payment_method_id"
                  options={paymentMethodOptions}
                  sx={{ width: 300 }}
                  name="property_payment_method_id"
                  renderInput={(params) => (
                    <TextField {...params} label="Payment Methods" />
                  )}
                  value={
                    Array.isArray(data?.property_payment_method_id)
                      ? data?.property_payment_method_id[1]
                      : paymentMethod?.["label"]
                  }
                /> */}
                 <input
                    readOnly
                    type="text"
                    className="form-control"
                    id="property_payment_method_id"
                    name="property_payment_method_id"
                    // value={data?.email ? data?.email : ""}
                    value={
                      Array.isArray(data?.property_payment_method_id)
                        ? data?.property_payment_method_id[1]
                        : paymentMethod?.["label"]
                    }
                    // onChange={handleChange}
                  />
              </div>
            </div>
          </div>
          {/* <div className="col-4"></div> */}
        </div>
      {/* </div> */}
    </>
  );
};

export default SalesAndPurchase;
