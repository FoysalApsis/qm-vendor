import { Button, CircularProgress, Snackbar } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Alert from "@mui/material/Alert";
import React, { useEffect, useState, useCallback } from "react";
import serverAPI from "../../../config/serverAPI";
import VendorTabs from "./VendorTabs";
import MainLayout from "../../../components/layout/mainLayout";
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
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
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
      .catch(async (err) => {
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
      });
  }, []);

  const getState = async () => {
    const body = { jsonrpc: "2.0", params: {"country_id":data?.country_id} };
    await serverAPI
      .post(`get-state`, body)
      .then((res) => {
        setStates(
          res?.data.response.map((elm) => {
            return { id: elm[0].id, label: elm[0].display_name };
          })
        );
      })
      .catch(async (err) => {
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
      .catch(async (err) => {
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
      .catch(async (err) => {
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
            console.log(elm[0], "childsds");
            return {
              id: elm[0]?.id,
              name: elm[0]?.name,
              email: elm[0]?.email,
              phone: elm[0]?.phone,
              mobile: elm[0]?.mobile,
              type: elm[0]?.type,
              title: elm[0]?.title[0],
              country_id: elm[0]?.country_id[0],
              state_id: elm[0]?.state_id[0],
              street: elm[0]?.street,
              street2: elm[0]?.street2,
              city: elm[0]?.city,
              zip: elm[0]?.zip,
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
    getCountries();
    getPaymentTerms();
    getTitle();
    getPartnerBank();
    getChildren();
    getPaymentMethod();
    getState();
  }, [getCountries]);

  useEffect(()=>{
    setData({...data,state_id:false})
    console.log(data,"data");
    getState();

  },[data?.country_id])
  
 
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
      {/* <PageLayout />
      <PageHeader title="My Information"> </PageHeader> */}
      <MainLayout pageTitle={"My Information"}>
        <Snackbar
          open={alert}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Update Successfully
          </Alert>
        </Snackbar>

        <form className="mb-5">
          <div className="row ">
            <div className="row col-6">
              <div className="col-12 segoe-bold">
                <label htmlFor="name">Name</label>
              </div>
              <div className="col-12">
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
            </div>
            <div className="row col-6">
              <div className="col-12 segoe-bold">
                <label htmlFor="phone">Phone</label>
              </div>
              <div className="col-12">
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
            </div>
          </div>
          <div className="row mt-3">
            <div className="row col-6">
              <div className="col-12 segoe-bold">
                <label htmlFor="address">Address</label>
              </div>
              <div className="col-12">
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
              {/* <div className="col-12 mt-2">
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
              </div> */}
            </div>

            <div className="row col-6">
              <div className="col-12 segoe-bold">
                <label htmlFor="phone">Mobile</label>
              </div>
              <div className="col-12">
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
            </div>
            <div className="row col-6">
              <div className="col-12 mt-2">
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
              <div className="col-6 mt-2">
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

              <div className="col-6 mt-2">
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
            </div>
            <div className="row col-6">
              <div className="col-12 mt-3 segoe-bold">
                <label htmlFor="phone">Email</label>
              </div>
              <div className="col-12">
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
            </div>
            <div className="row col-6">
              <div className="col-6 mt-2">
                <Autocomplete
                  name="country_id"
                  id="country_id"
                  options={countries}
                  autoHighlight
                  size="small"
                  defaultValue={
                    Array.isArray(data?.country_id)
                      ? { id: data?.country_id[0], label: data?.country_id[1] }
                      : user?.country_id
                      ? { id: user?.country_id[0], label: user?.country_id[1] }
                      : { id: "", label: "" }
                  }
                  loading={countries?.length < 2}
                  loadingText={"Loading...."}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, value) =>
                    option?.id === value?.id
                  }
                  onChange={(e, value) => {
                    setData({
                      ...data,
                      country_id: parseInt(value?.id),
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      name="country_id"
                      {...params}
                      label="Select a Country"
                      // InputProps={{
                      //   ...params.InputProps,
                      //   endAdornment: (
                      //     <>
                      //       {countries?.length < 2 ? (
                      //         <CircularProgress color="inherit" size={20} />
                      //       ) : null}
                      //       {params.InputProps.endAdornment}
                      //     </>
                      //   ),
                      // }}
                    />
                  )}
                />
              </div>
              <div className="col-6 mt-2">
                <Autocomplete
                  name="state_id"
                  id="state_id"
                  options={states}
                  autoHighlight
                  size="small"
                  defaultValue={
                    Array.isArray(data?.state_id)
                      ? { id: data?.state_id[0], label: data?.state_id[1] }
                      : user?.state_id
                      ? { id: user?.state_id[0], label: user?.state_id[1] }
                      : { id: "", label: "" }
                  }
                  // loading={states?.length < 2}
                  // loadingText={"Loading...."}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, value) =>
                    option?.id === value?.id
                  }
                  onChange={(e, value) => {
                    setData({
                      ...data,
                      state_id: parseInt(value?.id),
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      name="state_id"
                      {...params}
                      label="Select a State"
                      // InputProps={{
                      //   ...params.InputProps,
                      //   endAdornment: (
                      //     <>
                      //       {states?.length < 2 ? (
                      //         <CircularProgress color="inherit" size={20} />
                      //       ) : null}
                      //       {params.InputProps.endAdornment}
                      //     </>
                      //   ),
                      // }}
                    />
                  )}
                />
              </div>
            </div>
            <div className="row col-6">
              <div className="col-12 mt-2 segoe-bold">
                <label htmlFor="website">Website</label>
              </div>

              <div className="col-12 mt-2">
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
            </div>

            <div className="row col-6">
              <div className="col-12 mt-2 segoe-bold">
                <label htmlFor="vat">Tax ID</label>
              </div>
              <div className="col-12 ">
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
            </div>
            <div className="row col-6">
              <div className="col-12 mt-2 segoe-bold">
                <label htmlFor="fax">Fax No</label>
              </div>
              <div className="col-12 ">
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
              // color="secondary"
              variant="contained"
              onClick={handleSubmit}
              className="!bg-primaryColor"
            >
              Update
            </Button>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default SingleVendor;
