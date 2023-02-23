import { Button } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import PageHeader from "../../components/layout/pageHeader";
import PageLayout from "../../components/layout/pageLayout";
import serverAPI from "../../config/serverAPI";

const CreateBill = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([{}]);
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);
  const [selectedPO, setSelectedPO] = useState()

  const uploadPdfFile = (e) => {
   console.log(e.target.files[0]);
    setFile(e.target.files[0])
  };

  const sendFile = ()=>{
    if (selectedPO) {
      const formData = new FormData();
      console.log(file,"this is file");
      formData.append("document", file);
      formData.append("id",selectedPO)
      uploadFile(formData)
    }
    else{
      toast.error('Please Select a Purchase Order', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  // const handleChange = (e) =>{
  //   setSelectedPO(e.target.value)
  // }

  const uploadFile = useCallback(async (args) => {
    const body = args
    await serverAPI
      .post(`/upload-file-to-po`, body)
      .then((res) => {
        // setSinglePO(
        //   res?.data?.response.map((elm) => {
        //     // console.log(elm[0],"single po");
        //     // return { partner_id:elm[0].partner_id[1], date_order:elm[0].date_order,partner_ref:elm[0].partner_ref,date_planned:elm[0].date_planned, po_approver_id:elm[0].po_approver_id[1],currency_id:elm[0].currency_id[1], };
        //     getVendor(elm[0]?.shift_to_id ? elm[0]?.shift_to_id[0] : 0);
        //     getCompany(elm[0]?.company_id ? elm[0]?.company_id[0] : 0);

        //     return {
        //       ...elm[0],
        //       // street: user?.street,
        //       // street2: user?.street2,
        //     };
        //   })
        // );
        toast.success(res?.data?.msg, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      })
      .catch((err) => {
        console.log(err,"error");
        toast.error(err?.response?.data?.msg, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      });
  }, []);

  const getMyPO = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("userObj"));
    const body = { jsonrpc: "2.0", params: { id: user.id } };
    await serverAPI
      .post(`get-my-po`, body)
      .then((res) => {
        setPurchaseOrders(
          res?.data?.response.map((elm) => {
            return {
              id: elm[0].id,
              display_name: elm[0].display_name,
              company_id: elm[0].company_id[1],
              partner_id: elm[0].partner_id[1],
              date_order: elm[0].date_order,
              amount_total: elm[0].tax_totals.formatted_amount_total,
              state: elm[0].state,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    getMyPO();
  }, []);
  return (
    <div className="main-container">
      <PageLayout />
      <PageHeader title={"Submit Invoice"}></PageHeader>
      <div className="row mt-2">
        <div className="row col-6">
          <div className="col-4">
            <label htmlFor="Po">Purchase Order Number:</label>
          </div>
          <div className="col-8">
            <select
              id="purchase_order"
              name="purchase_order"
              className="form-control"
              placeholder="Select a purchase order"
              onChange={(e)=>setSelectedPO(e.target.value)}
              // value={
              //   Array.isArray(data?.country_id)
              //     ? data?.country_id[0]
              //     : data?.country_id
              // }
            >
              <option value="">Select Purchase Order</option>
              {purchaseOrders?.map((item, index) => (
                <option value={item?.id} key={index}>
                  {item?.display_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="col-11 mt-2">
            {" "}
            <Button
              className="capitalize mt-5"
              size="small"
              variant="contained"
              onClick={() => fileInput?.current?.click()}
            >
              Upload Invoice{" "}
              <input
                ref={fileInput}
                onChange={(e) => uploadPdfFile(e)}
                type="file"
                style={{ display: "none" }}
                accept=".pdf"
              />{" "}
            </Button>
            <Button
              className="capitalize mt-5 ms-3"
              size="small"
              variant="contained"
              color="secondary"

              onClick={sendFile}
            >
              Submit{" "}
            </Button>
          </div>
      </div>
    </div>
  );
};

export default CreateBill;
