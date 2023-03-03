import { Button, CircularProgress, Snackbar } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Alert from "@mui/material/Alert";
import React, { useEffect, useState, useCallback } from "react";
import PageHeader from "../../../components/layout/pageHeader";
import PageLayout from "../../../components/layout/pageLayout";
import serverAPI from "../../../config/serverAPI";
import uploadlogo from "../../../images/upload.png";
import VendorTabs from "./VendorTabs";
const iconStyles = {
  width: "30px",
  height: "30px",
  marginBottom: "0.7rem",
  cursor: "pointer",
};
const SingleVendor = () => {
  const [data, setData] = useState(null);
  const user = JSON.parse(localStorage.getItem("userObj"));
  const [countries, setCountries] = useState([{}]);
  const [states, setStates] = useState([{}]);
  const [titles, setTitles] = useState([{}]);
  const [banks, setBanks] = useState([{}]);
  const [alert, setAlert] = useState(false);
  const [childs, setChilds] = useState([{}]);

  const [paymentTerm, setPaymentTerm] = useState(null);
  const [paymentTermOptions, setPaymentTermOptions] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [paymentMethodOptions, setPaymentMethodOptions] = useState([]);

  const [childEmail, setChildEmail] = useState([]);

  const getUserInfo = () => {
    if (user) {
      setData({
        id: user?.id,
        name: user?.name,
        street: user?.street,
        street2: user?.street2,
        phone: user?.phone,
        mobile: user?.mobile,
        city: user?.city,
        state_id: user?.state_id?.[0],
        zip: user?.zip,
        email: user?.email,
        country_id: user?.country_id?.[0],
        website: user?.website,
        vat: user?.vat,
        fax: user?.fax,
        property_supplier_payment_term_id:
          user?.property_supplier_payment_term_id?.[0],
        property_payment_method_id: user?.property_payment_method_id?.[0],
        bank_name: user?.bank_name,
        bank_ic: user?.bank_ic,
        transit_no: user?.transit_no,
        acc_no: user?.acc_no,
      });
      setPaymentTerm({
        id: user?.property_supplier_payment_term_id?.[0],
        label: user?.property_supplier_payment_term_id?.[1],
      });
      setPaymentMethod({
        id: user?.property_payment_method_id?.[0],
        label: user?.property_payment_method_id?.[1],
      });
    }
    console.log(user, "user");
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    console.log(name,value,"val");
    if (type === "file") {
      setData({
        ...data,
        [name]: e.target.files[0],
      });
    } else if (type === "select-one") {
      setData({
        ...data,
        [name]: parseInt(value),
      });
    } else {
      setData({
        ...data,
        [name]: type === "number" ? parseInt(value) : value,
      });
    }
  };

  const getCountries = useCallback(async () => {
    const body = { jsonrpc: "2.0", params: {} };
    await serverAPI
      .post(`get-country`, body)
      .then((res) => {
        setCountries(
          res?.data?.response.map((elm) => {
            return { id: elm[0].id, label: elm[0].display_name };
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const getState = async () => {
    const body = { jsonrpc: "2.0", params: {} };
    await serverAPI
      .post(`get-state`, body)
      .then((res) => {
        setStates(
          res?.data.response.map((elm) => {
            return { id: elm[0].id, label: elm[0].display_name };
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getPaymentTerms = useCallback(async () => {
    const body = { jsonrpc: "2.0", params: {} };
    await serverAPI
      .post(`get-payment-terms`, body)
      .then((res) => {
        setPaymentTermOptions(
          res?.data?.response.map((elm) => {
            return { id: elm[0].id, label: elm[0].display_name };
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const getPaymentMethod = useCallback(async () => {
    const body = { jsonrpc: "2.0", params: {} };
    await serverAPI
      .post(`get-payment-method`, body)
      .then((res) => {
        setPaymentMethodOptions(
          res?.data?.response.map((elm) => {
            return { id: elm[0].id, label: elm[0].display_name };
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const getTitle = useCallback(async () => {
    const body = { jsonrpc: "2.0", params: {} };
    await serverAPI
      .post(`get-title`, body)
      .then((res) => {
        setTitles(
          res?.data?.response.map((elm) => {
            return { id: elm[0].id, label: elm[0].display_name };
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const getChildren = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("userObj"));
    const body = { jsonrpc: "2.0", params: { child_ids: user.child_ids } };
    await serverAPI
      .post(`get-vendor-children`, body)
      .then((res) => {
        setChilds(
          res?.data?.response.map((elm) => {
            console.log(elm[0],"childsds");
            return {
              id: elm[0]?.id,
              name: elm[0]?.name,
              email: elm[0]?.email,
              phone: elm[0]?.phone,
              mobile: elm[0]?.mobile,
              type: elm[0]?.type,
              title: elm[0]?.title[0],
              country_id:elm[0]?.country_id[0],
              state_id:elm[0]?.state_id[0],
              street:elm[0]?.street,
              street2:elm[0]?.street2,
              city:elm[0]?.city,
              zip:elm[0]?.zip


            };
            // return {...elm[0]}
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const getPartnerBank = useCallback(async () => {
    const body = { jsonrpc: "2.0", params: {} };
    await serverAPI
      .post(`get-partner-bank`, body)
      .then((res) => {
        setBanks(
          res?.data?.response.map((elm) => {
            return { id: elm[0].id, label: elm[0].display_name };
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    getUserInfo();
    getState();
    getCountries();
    getPaymentTerms();
    getTitle();
    getPartnerBank();
    getChildren();
    getPaymentMethod();
  }, [getCountries]);

  let submit_data = {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentTerm == null) {
      const { property_supplier_payment_term_id, ...rest } = data;
      submit_data = rest;
    } else {
      submit_data = data;
    }
    const res = {
      jsonrpc: "2.0",
      params: { ...submit_data, id: user?.id },
    };

    // console.log(res);
    await serverAPI
      .post(`update-vendor`, res)
      .then((res) => {
        setAlert(true);
        refetchUserData();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const refetchUserData = async () => {
    const res = {
      jsonrpc: "2.0",
      params: { email: user?.email, password: user?.vendor_password },
    };
    return await serverAPI
      .post("/auth-vendor", res, {})
      .then((res) => {
        console.log(res, "auth vendopr");
        localStorage.setItem("userObj", JSON.stringify(res?.data[0]));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //* close notification
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
  };

  

  return (
    <>
      {" "}
      <PageLayout />
      <PageHeader title="My Information"> </PageHeader>
      <Snackbar
        open={alert}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Update Successfully
        </Alert>
      </Snackbar>
      <div className="main-container">
        <form>
          <div className="row">
            <div className="col-1">
              <label htmlFor="name">Name:</label>
            </div>
            <div className="col-5">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={data?.name ? data?.name : ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* <div className="col-1"></div>
            <div className="col-5">
              <div className="image-upload">
                <label htmlFor="file-input">
                  <img
                    src={uploadlogo}
                    alt="uploadlogo"
                    className="mb-4 "
                    style={iconStyles}
                  />
                </label>
                <input
                  id="file-input"
                  type="file"
                  name="profile"
                  onChange={handleChange}
                />
              </div>
            </div> */}
          </div>
          <div className="row mt-5">
            <div className="col-1">
              <label htmlFor="address">Address:</label>
            </div>
            <div className="col-5">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  name="street"
                  value={data?.street ? data?.street : ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-1">
              <label htmlFor="phone">Phone:</label>
            </div>
            <div className="col-5">
              {" "}
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={data?.phone ? data?.phone : ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-1"></div>
            <div className="col-5 mt-2">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="street2"
                  name="street2"
                  value={data?.street2 ? data?.street2 : ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-1 mt-2">
              <label htmlFor="phone">Mobile:</label>
            </div>
            <div className="col-5 mt-2">
              {" "}
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                  value={data?.mobile ? data?.mobile : ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-1 mt-2"></div>
            <div className="col-2 mt-2">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={data?.city ? data?.city : ""}
                  placeholder="City"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-3 mt-2">
              {/* <select
                id="state_id"
                name="state_id"
                className="form-control"
                placeholder="State"
                onChange={handleChange}
                value={
                  Array.isArray(data?.state_id)
                    ? data?.state_id[0]
                    : data?.state_id
                }
              >
                <option value="">Select State</option>
                {states?.length < 2 && (
                  <option value="...loading">Loading....</option>
                )}
                {states?.map((item, index) => (
                  <option value={item?.id} key={index}>
                    {item?.label}
                  </option>
                ))}
              </select> */}
              <Autocomplete
                    name="state_id"
                    id="state_id"
                    options={states}
                    autoHighlight
                    size="small"
                    defaultValue = {
                      Array.isArray(data?.state_id)
                      ? {id:data?.state_id[0],label:data?.state_id[1]}
                      : user?.state_id ? {id:user?.state_id[0],label:user?.state_id[1]} : {id:"",label:""}
                    }
                    loading={states?.length < 2}
                    loadingText={"Loading...."}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option,value) =>  option?.id === value?.id}
                    onChange={(e,value)=>{ setData({
                      ...data,
                      "state_id": parseInt(value?.id),
                    });} }
                   
                    renderInput={(params) => <TextField     name="state_id" {...params} label="Select a State"  InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {states?.length < 2 ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }} />}
                    />
            </div>
            {/* <div className="col-1 mt-2">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  name="zip"
                  placeholder="ZIP"
                  value={data?.zip ? data?.zip : ""}
                  onChange={handleChange}
                />
              </div>
            </div> */}
            <div className="col-1 mt-2">
              <label htmlFor="phone">Email:</label>
            </div>
            <div className="col-5 mt-2">
              {" "}
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={data?.email ? data?.email : ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-1"></div>
            <div className="col-4 mt-2">
              {/* <select
                id="country_id"
                name="country_id"
                className="form-control"
                placeholder="country"
                onChange={handleChange}
                value={
                  Array.isArray(data?.country_id)
                    ? data?.country_id[0]
                    : data?.country_id
                }
              >
                <option value="">
                  Select Country
                </option>
                {countries?.length < 2 && (
                  <option value="...loading">Loading....</option>
                )}
                {countries?.length > 2 &&
                  countries?.map((item, index) => (
                    <option value={item?.id} key={index}>
                      {item?.label}
                    </option>
                  ))}
              </select> */}
                    <Autocomplete
                    name="country_id"
                    id="country_id"
                    options={countries}
                    autoHighlight
                    size="small"
                    defaultValue = {
                      Array.isArray(data?.country_id)
                      ? {id:data?.country_id[0],label:data?.country_id[1]}
                      : user?.country_id ? {id:user?.country_id[0],label:user?.country_id[1]} : {id:"",label:""}
                    }
                    loading={countries?.length < 2}
                    loadingText={"Loading...."}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option,value) =>  option?.id === value?.id}
                    onChange={(e,value)=>{ setData({
                      ...data,
                      "country_id": parseInt(value?.id),
                    });} }
                   
                    renderInput={(params) => <TextField     name="country_id" {...params} label="Select a Country"  InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {countries?.length < 2 ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }} />}
                    />
            </div>
            <div className="col-1 mt-2">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  name="zip"
                  placeholder="ZIP"
                  value={data?.zip ? data?.zip : ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-1 mt-2">
              <label htmlFor="website">Website Link:</label>
            </div>
            <div className="col-5 mt-2">
              {" "}
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="website"
                  name="website"
                  placeholder="e.g. https://www.odoo.com"
                  onChange={handleChange}
                  value={data?.website ? data?.website : ""}
                />
              </div>
            </div>
            <div className="col-1 mt-2">
              <label htmlFor="vat">Tax ID:</label>
            </div>
            <div className="col-5 mt-2">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="vat"
                  name="vat"
                  value={data?.vat ? data?.vat : ""}
                  placeholder="e.g. BE0477472701"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-1 mt-2">
              <label htmlFor="fax">Fax Number:</label>
            </div>
            <div className="col-5 mt-2">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="fax"
                  name="fax"
                  value={data?.fax ? data?.fax : ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </form>
        <hr />
        <div>
          <VendorTabs
            setData={setData}
            data={data}
            handleChange={handleChange}
            paymentTerm={paymentTerm}
            setPaymentTerm={setPaymentTerm}
            paymentTermOptions={paymentTermOptions}
            setPaymentTermOptions={setPaymentTermOptions}
            titles={titles}
            states={states}
            countries={countries}
            banks={banks}
            childs={childs}
            childEmail={childEmail}
            setChildEmail={setChildEmail}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            paymentMethodOptions={paymentMethodOptions}
            setPaymentMethodOptions={setPaymentMethodOptions}
          />
        </div>
        <div className="d-flex justify-content-between">
          <div></div>
          <div className="mt-5">
            {" "}
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              onClick={handleSubmit}
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleVendor;
