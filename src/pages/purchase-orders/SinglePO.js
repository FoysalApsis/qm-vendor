import { Button, CircularProgress } from "@mui/material";
import { idID } from "@mui/material/locale";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/layout/pageHeader";
import PageLayout from "../../components/layout/pageLayout";
import serverAPI from "../../config/serverAPI";
import PurchaseTabs from "./PurchaseTabs";

const SinglePO = () => {
  const [singlePO, setSinglePO] = useState();
  const [productsPO, setProductsPO] = useState();
  const [vendor, setVendor] = useState();
  const [company, setCompany] = useState();
  const [tax, setTax] = useState();
  const [data, setData] = useState(null);
  const [loading,setLoading] = useState(false)

  const user = JSON.parse(localStorage.getItem("userObj"));
  let { id } = useParams();

  const handleChange = () => {
    console.log();
  };
  // const downloadPDF = () =>{
  //   getPDF()

  // }
  //   const handleChange = (e) => {
  //     const { name, value, type } = e.target
  //     if (type === "file") {
  //       setData({
  //         ...data,
  //         [name]: e.target.files[0],
  //       })
  //     } else if (type === "select-one") {
  //       setData({
  //         ...data,
  //         [name]: parseInt(value),
  //       })
  //     } else {
  //       setData({
  //         ...data,
  //         [name]: type === "number" ? parseInt(value) : value,
  //       })
  //     }
  //   }


  const getSinglePO = useCallback(async () => {
    const body = { jsonrpc: "2.0", params: { id } };
    await serverAPI
      .post(`get-single-po`, body)
      .then((res) => {
        setSinglePO(
          res?.data?.response.map((elm) => {
            // console.log(elm[0],"single po");
            // return { partner_id:elm[0].partner_id[1], date_order:elm[0].date_order,partner_ref:elm[0].partner_ref,date_planned:elm[0].date_planned, po_approver_id:elm[0].po_approver_id[1],currency_id:elm[0].currency_id[1], };
            getVendor(elm[0]?.shift_to_id ? elm[0]?.shift_to_id[0] : 0);
            getCompany(elm[0]?.company_id ? elm[0]?.company_id[0] : 0);

            return {
              ...elm[0],
              // street: user?.street,
              // street2: user?.street2,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])
  const getPDF = useCallback(async (args) => {
    setLoading(true)
    const body = { jsonrpc: "2.0", 
    params: { 
      id,
      file_name : `Purchase Order-${args}.pdf`
    } 
  }
    await serverAPI
      .post(`get-pdf`, body)
      .then((res) => {
        console.log(res,"ress");
        if(res?.data?.fileArrived) {
          let a = document.createElement("a");
          a.setAttribute("download",true)
          a.setAttribute("target","_blank")
          a.setAttribute("href",`${process.env.REACT_APP_API_URL}/${res?.data?.data}`);
          a.click()
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const getPoProducts = useCallback(async () => {
    const body = { jsonrpc: "2.0", params: { id } };
    await serverAPI
      .post(`get-po-products`, body)
      .then((res) => {
        let tax;
        setProductsPO(
          res?.data?.response.map((elm) => {
            return {
              ...elm[0],
            };
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const getVendor = useCallback(
    async (arg) => {
      const body = { jsonrpc: "2.0", params: { id: arg } };
      await serverAPI
        .post(`get-vendor`, body)
        .then((res) => {
          setVendor(
            res?.data?.response.map((elm) => {
              // return { partner_id:elm[0].partner_id[1], date_order:elm[0].date_order,partner_ref:elm[0].partner_ref,date_planned:elm[0].date_planned, po_approver_id:elm[0].po_approver_id[1],currency_id:elm[0].currency_id[1], };
              return {
                ...elm[0],
              };
            })
          );
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    [SinglePO]
  );
  const getCompany = useCallback(
    async (arg) => {
      const body = { jsonrpc: "2.0", params: { id: arg } };
      await serverAPI
        .post(`get-company`, body)
        .then((res) => {
          setCompany(
            res?.data?.response.map((elm) => {
              // return { partner_id:elm[0].partner_id[1], date_order:elm[0].date_order,partner_ref:elm[0].partner_ref,date_planned:elm[0].date_planned, po_approver_id:elm[0].po_approver_id[1],currency_id:elm[0].currency_id[1], };
              return {
                ...elm[0],
              };
            })
          );
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    [SinglePO]
  );


  useEffect(() => {
    getSinglePO();
    getPoProducts();
  }, []);

  return (
    <div className="main-container">
      <PageLayout />
      <PageHeader title={`PO:  ${ singlePO?.[0] ? singlePO?.[0]?.display_name : ""} `}>
      {" "}
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              onClick={()=>getPDF(singlePO?.[0]?.name)}
            >
              Download PO
            </Button>
        { loading && <CircularProgress color="secondary" className="ms-3"/>}

      </PageHeader>
      <form>
        {/* <div className="row">
        </div> */}
        <div className="row mt-2 justify-content-between">
          <div className="row col-6">
          <div className="col-3">
            <label htmlFor="name">Vendor:</label>
          </div>
          <div className="col-9">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="partner_id"
                name="partner_id"
                value={
                  singlePO?.[0]?.partner_id ? singlePO?.[0]?.partner_id[1] : ""
                }
                disabled
                onChange={handleChange}
              />
            </div>
          </div>

          </div>
          <div className="row col-6">
          <div
            className="col-3"
            style={{ display: "grid", placeContent: "center" }}
          >
            <label htmlFor="name">Order Date:</label>
          </div>
          <div className="col-9">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="date_order"
                name="date_order"
                value={singlePO?.[0]?.date_order ? singlePO[0]?.date_order : ""}
                onChange={handleChange}
                disabled

              />
            </div>
          </div>

          </div>
          <div className="row col-6">

          <div className="col-3 mt-2">
            <label htmlFor="address">Vendor Reference:</label>
          </div>
          <div className="col-9 mt-2">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="partner_ref"
                name="partner_ref"
                disabled
                value={
                  singlePO?.[0]?.partner_ref ? singlePO[0].partner_ref : ""
                }
                //   value={data?.street ? data?.street : ""}
                onChange={handleChange}
              />
            </div>
          </div>
          </div>
          <div className="row col-6">

          <div className="col-3 mt-2"
           style={{ display: "grid", placeContent: "center" }}
          >
            <label htmlFor="phone">Expected Arrival:</label>
          </div>
          <div className="col-9 mt-2">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="date_planned"
                name="date_planned"
                disabled
                value={
                  singlePO?.[0]?.date_planned ? singlePO[0].date_planned : ""
                }
                //   value={data?.phone ? data?.phone : ""}
                onChange={handleChange}
              />
            </div>
          </div>
          </div>
          <div className="row col-xl-6 col-lg-12">

          <div className="col-3 mt-2 mb-5">
            <label htmlFor="phone">Purchase Representative:</label>
          </div>
          <div className="col-9 mt-2">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="po_approver_id"
                name="po_approver_id"
                disabled
                value={singlePO?.[0]?.user_id ? singlePO[0].user_id[1] : ""}
                //   value={data?.mobile ? data?.mobile : ""}
                onChange={handleChange}
              />
            </div>
          </div>
          </div>
          <div className="row col-xl-6 col-lg-12">

          <div className="col-6"></div>
          </div>

          <div className="col-1 mt-2">
            <label htmlFor="phone">Vendor Address</label>
          </div>
          <div className="col-11 mt-2">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="po_approver_id"
                name="po_approver_id"
                placeholder=""
                disabled
                value={user?.street ? user?.street : ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-1 mt-2"></div>
          <div className="col-11 mt-2">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="po_approver_id"
                name="po_approver_id"
                placeholder=""
                disabled
                value={user?.street2 ? user?.street2 : ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-1 mt-2"></div>
          <div className="col-3 mt-2">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="po_approver_id"
                name="po_approver_id"
                placeholder="City"
                disabled
                value={user?.city ? user?.city : ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-3 mt-2">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="po_approver_id"
                name="po_approver_id"
                placeholder="State"
                disabled
                value={user?.state_id ? user?.state_id[1] : ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-2 mt-2">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="po_approver_id"
                name="po_approver_id"
                placeholder="Zip code"
                disabled
                value={user?.zip ? user?.zip : ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-3 mt-2 mb-5">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="po_approver_id"
                name="po_approver_id"
                placeholder="Country"
                disabled
                value={user?.country_id ? user?.country_id[1] : ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-1 mt-2">
            <label htmlFor="phone">Shipping Address</label>
          </div>
          <div className="col-11 mt-2">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="po_approver_id"
                name="po_approver_id"
                placeholder=""
                disabled
                value={
                  vendor?.[0]?.street
                    ? vendor?.[0]?.street
                    : company?.[0]?.street1
                    ? company?.[0]?.street1
                    : ""
                }
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-1 mt-2"></div>
          <div className="col-11 mt-2">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="po_approver_id"
                name="po_approver_id"
                placeholder=""
                disabled
                value={
                  vendor?.[0]?.street2
                    ? vendor?.[0]?.street2
                    : company?.[0]?.street2
                    ? company?.[0]?.street2
                    : ""
                }
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-1 mt-2"></div>
          <div className="col-3 mt-2">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="po_approver_id"
                name="po_approver_id"
                placeholder="City"
                disabled
                value={
                  vendor?.[0]?.city
                    ? vendor?.[0]?.city
                    : company?.[0]?.city
                    ? company?.[0]?.city
                    : ""
                }
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-3 mt-2">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="po_approver_id"
                name="po_approver_id"
                placeholder="State"
                disabled
                value={
                  vendor?.[0]?.state_id
                    ? vendor?.[0]?.state_id[1]
                    : company?.[0]?.state_id[1]
                    ? company?.[0]?.state_id[1]
                    : ""
                }
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-2 mt-2">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="po_approver_id"
                name="po_approver_id"
                placeholder="Zip code"
                disabled
                value={
                  vendor?.[0]?.zip
                    ? vendor?.[0]?.zip
                    : company?.[0]?.zip
                    ? company?.[0]?.zip
                    : ""
                }
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-3 mt-2">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="po_approver_id"
                name="po_approver_id"
                placeholder="Country"
                disabled
                value={
                  vendor?.[0]?.country_id
                    ? vendor?.[0]?.country_id[1]
                    : company?.[0]?.country_id[1]
                    ? company?.[0]?.country_id[1]
                    : ""
                }
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-1 "></div>
        
        </div>
      </form>
      <hr />
      <div>
        <PurchaseTabs data={productsPO} total={singlePO?.[0]?.tax_totals} />
      </div>
      {/* <div className="d-flex justify-content-between">
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
      </div> */}
    </div>
  );
};

export default SinglePO;
