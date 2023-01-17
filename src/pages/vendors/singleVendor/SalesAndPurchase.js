import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
const SalesAndPurchase = (props) => {
  const { data, setData, handleChange } = props;
  const [paymentTerm, setPaymentTerm] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [checked, setChecked] = useState(false); //* check reciept reminder checked or not
  const PaymentTermOptions = [
    { label: "10 days", value: 10 },
    { label: "30 Days", value: 30 },
  ];

  const paymentMethodOptions = [
    { label: "Manual", value: "Manual" },
    { label: "EFT", value: "EFT" },
    { label: "Checks", value: "Checks" },
  ];

  const handlePaymentTermChange = (event, values) => {
    setPaymentTerm(values?.value);
  };
  const handlePaymentMethodChange = (event, values) => {
    setPaymentMethod(values?.value);
  };

  useEffect(() => {
    if (paymentTerm != null) {
      setData({
        ...data,
        paymentTerm: paymentTerm,
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
              <div className="col-2 mt-2">
                <label htmlFor="paymentTerms">Payment Terms:</label>
              </div>
              <div className="col-4">
                <Autocomplete
                 size="small"
                  disablePortal
                  onChange={handlePaymentTermChange}
                  id="Payment Terms"
                  options={PaymentTermOptions}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  sx={{ width: 300 }}
                  name="paymentTerm"
                  renderInput={(params) => (
                    <TextField {...params} label="Payment Terms" />
                  )}
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
              <div className="col-2 mt-2">
                <label htmlFor="paymentTerms">Payment Method:</label>
              </div>
              <div className="col-4">
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
        <div className="mt-2">
          {" "}
          <div className="col-8">
            <div className="row">
              <div className="col-2 mt-2">
                <label htmlFor="paymentTerms">Receipt Reminder:</label>
              </div>
              <div className="col-10">
                <div className="row">
                  <div className="col-1">
                    {" "}
                    <Checkbox
                      checked={checked}
                      onChange={(e) => setChecked(e.target.checked)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                  <div className="col-3">
                    {" "}
                    {checked ? (
                      <>
                        <div className="form-group w-50">
                          <input
                            type="number"
                            min="1"
                            className="form-control"
                            id="receiptReminder"
                            name="receiptReminder"
                            onWheel={(e) => e.target.blur()}
                            onChange={handleChange}
                          />
                          <span style={{display:"inline"}}>day(s) before</span>
                        </div>
                        
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </>
  );
};

export default SalesAndPurchase;
