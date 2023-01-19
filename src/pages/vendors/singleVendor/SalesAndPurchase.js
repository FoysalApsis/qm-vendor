import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import serverAPI from "../../../config/serverAPI";
const SalesAndPurchase = (props) => {
  const { data, setData, handleChange,paymentTerm,setPaymentTerm  } = props;
  // const [paymentTerm, setPaymentTerm] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [checked, setChecked] = useState(false); //* check reciept reminder checked or not
  const [paymentTermOptions,setPaymentTermOptions]=useState([])

  const login_params = {
    "db": process.env.REACT_APP_DB,
    "login": process.env.REACT_APP_LOGIN,
    "password": process.env.REACT_APP_PASSWORD,
  }
  const getPaymentTerms = async () => {
    const body = {jsonrpc:"2.0",params:{"login_params":login_params}}
    await serverAPI
      .post(`get-payment-terms`, body)
      .then((res) => {
        setPaymentTermOptions(
          res?.data?.result?.response.map((elm) => {
            return {id: elm[0].id, label: elm[0].display_name}
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(()=>{
    getPaymentTerms()
  },[])

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



  // console.log(data);
  // console.log(paymentTerm);

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
