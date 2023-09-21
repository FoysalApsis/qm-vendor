import { Button, CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../components/layout/mainLayout";
import PageHeader from "../../components/layout/pageHeader";
import PageLayout from "../../components/layout/pageLayout";
import serverAPI from "../../config/serverAPI";
import SectionHeading from "../../components/layout/SectionHeading";

const SinglePR = () => {
  const [singlePR, setSinglePR] = useState();
  let { id } = useParams();
  const [loading, setLoading] = useState(false);

  const getSinglePR = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("userObj"));
    const body = { jsonrpc: "2.0", params: { id } };
    await serverAPI
      .post(`get-single-pr`, body)
      .then((res) => {
        setSinglePR(
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

  const getPDF = useCallback(async (args) => {
    setLoading(true);
    const body = {
      jsonrpc: "2.0",
      params: {
        id,
        file_name: `Payment Receipts-${args}.pdf`,
      },
    };
    await serverAPI
      .post(`get-payment-receipt-pdf`, body)
      .then((res) => {
        if (res?.data?.fileArrived) {
          let a = document.createElement("a");
          a.setAttribute("download", true);
          a.setAttribute("target", "_blank");
          a.setAttribute(
            "href",
            `${process.env.REACT_APP_API_URL}/${res?.data?.data}`
          );
          a.click();
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    getSinglePR();
  }, []);

  return (
    // <div className="main-container">
    //   <PageLayout />
    //   <PageHeader
    //     title={`Payment Receipt: ${
    //       singlePR?.[0]?.name ? singlePR?.[0]?.name : ""
    //     }`}
    //   >
    //     <Button
    //       type="submit"
    //       color="secondary"
    //       variant="contained"
    //       onClick={() => getPDF(singlePR?.[0]?.name)}
    //     >
    //       Download Purchase Receipt
    //     </Button>
    //   </PageHeader>
    <MainLayout
      pageTitle={`Payment Receipt: ${
        singlePR?.[0]?.name ? singlePR?.[0]?.name : ""
      }`}
      buttonName={"Download Payment Receipt"}
      onButtonClick={() => getPDF(singlePR?.[0]?.id)}
      loading={loading}
    >
       <SectionHeading title={`Payment Receipt: ${
        singlePR?.[0]?.name ? singlePR?.[0]?.name : ""
      }`} divider={false}> <Button
          type="submit"
          variant="contained"
          onClick={() => getPDF(singlePR?.[0]?.id)}
          className="h-8 segoe-normal capitalize !bg-[#0D3875]"
          style={{
            textTransform: "capitalize",
          }}
          startIcon={
            loading && (
              <CircularProgress color="inherit" size={"16px"} />
            )
          }
        >
         Download PO
        </Button></SectionHeading>
      <form>
        {/* <div className="row">
        </div> */}
        <div className="row mt-2 justify-content-between">
          <div className="row col-6 mb-2 ">
            <div className="col-12 segoe-bold">
              <label htmlFor="name">Vendor:</label>
            </div>
            <div className="col-12">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="partner_id"
                  name="partner_id"
                  value={
                    singlePR?.[0]?.partner_id
                      ? singlePR?.[0]?.partner_id[1]
                      : ""
                  }
                  disabled
                  // onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row col-6">
            {/* <div className="col-4">
              <label htmlFor="name">Journal:</label>
            </div>
            <div className="col-8">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="partner_id"
                  name="partner_id"
                  value={
                    singlePR?.[0]?.journal_id
                      ? singlePR?.[0]?.journal_id[1]
                      : ""
                  }
                  disabled
                  // onChange={handleChange}
                />
              </div>
            </div> */}
          </div>
          <div className="row col-6">
            <div className="col-12 mt-3 segoe-bold">
              <label htmlFor="name">Amount:</label>
            </div>
            <div className="col-12">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="partner_id"
                  name="partner_id"
                  value={singlePR?.[0]?.amount ? singlePR?.[0]?.amount : ""}
                  disabled
                  // onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row col-6">
            <div className="col-12 mt-3 segoe-bold">
              <label htmlFor="name">Funds available&nbsp;on:</label>
            </div>
            <div className="col-12">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="partner_id"
                  name="partner_id"
                  value={
                    singlePR?.[0]?.date_fund_available
                      ? singlePR?.[0]?.date_fund_available
                      : ""
                  }
                  disabled
                  // onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row col-6">
            <div className="col-12 mt-3 segoe-bold">
              <label htmlFor="name">Date:</label>
            </div>
            <div className="col-12">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="partner_id"
                  name="partner_id"
                  value={singlePR?.[0]?.date ? singlePR?.[0]?.date : ""}
                  disabled
                  // onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row col-6">
            <div className="col-12 mt-3 segoe-bold">
              <label htmlFor="name">Payment Method:</label>
            </div>
            <div className="col-12">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="partner_id"
                  name="partner_id"
                  value={
                    singlePR?.[0]?.payment_method_line_id
                      ? singlePR?.[0]?.payment_method_line_id?.[1]
                      : ""
                  }
                  disabled
                  // onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row col-6">
            <div className="col-12 mt-3 segoe-bold">
              <label htmlFor="name">Memo</label>
            </div>
            <div className="col-12 ">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="partner_id"
                  name="partner_id"
                  value={singlePR?.[0]?.ref ? singlePR?.[0]?.ref : ""}
                  disabled
                  // onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row col-6">
            <div className="col-12 mt-3 segoe-bold">
              <label htmlFor="name">Vendor Bank Account</label>
            </div>
            <div className="col-12 ">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="partner_id"
                  name="partner_id"
                  value={
                    singlePR?.[0]?.partner_bank_id
                      ? singlePR?.[0]?.partner_bank_id
                      : ""
                  }
                  disabled
                  // onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </MainLayout>
  );
};

export default SinglePR;
