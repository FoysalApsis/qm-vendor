import { Button, TextField } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import MainLayout from "../../components/layout/mainLayout";
import PageHeader from "../../components/layout/pageHeader";
import PageLayout from "../../components/layout/pageLayout";
import serverAPI from "../../config/serverAPI";

const CreateBill = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([{}]);
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);
  const [selectedPO, setSelectedPO] = useState();
  const [dateSubmission, setDateSubmission] = useState();
  const [invoiceNumber, setInvoiceNumber] = useState();

  const user = JSON.parse(localStorage.getItem("userObj"));
  console.log(user, "user");
  const uploadPdfFile = (e) => {
    if (e.target.files[0].size < 2000000) {
      setFile(e.target.files[0]);
    } else {
      toast.error("Cannot Upload File of size more than 2 MB", {
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
  };

  const sendFile = () => {
    if (selectedPO) {
      const formData = new FormData();
      formData.append("document", file);
      formData.append("po_id", selectedPO["id"]);
      formData.append("date_of_submission", dateSubmission);
      formData.append("invoice_number", invoiceNumber);
      formData.append("vendor_id", user?.id);
      formData.append("pdf_name", file["name"]);
      uploadFile(formData);
      // let submit_invoice = JSON.parse(localStorage.getItem("submit_invoice"))

      // let obj = {
      //   // "id":new Date().getTime(),
      //   "selected_po" : selectedPO['label'],
      //   "date":dateSubmission,
      //   "invoice_number":invoiceNumber,
      //   "pdf_name":file['name']
      // }
      // let arr;
      // if(submit_invoice){
      //   let tempArr = [...submit_invoice,obj]
      //   const unique =tempArr.reverse().filter(
      //     (obj, index) =>
      //     tempArr.findIndex((item) => item.selected_po === obj.selected_po) === index
      //   );
      //   localStorage.setItem("submit_invoice",JSON.stringify(unique))
      // }else{
      //   arr = [obj]
      //   localStorage.setItem("submit_invoice",JSON.stringify(arr))
      // }
    } else {
      toast.error("Please Select a Purchase Order", {
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
  };
  const handleChange = (e) => {
    let { name, value, type } = e.target;
    if (name === "purchase_order") {
      value = JSON.parse(value);
      setSelectedPO({ id: value?.id, label: value?.display_name });
    } else if (name === "date") {
      setDateSubmission(value);
    } else if (name === "invoice_number") {
      setInvoiceNumber(value);
    }
  };

  const uploadFile = useCallback(async (args) => {
    const body = args;
    await serverAPI
      .post(`/upload-file-to-po`, body)
      .then((res) => {
        setSelectedPO({});
        setInvoiceNumber();
        setDateSubmission();
        setFile();
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
        console.log(err, "error");
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
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    setDateSubmission(`${year}/${month}/${day}`)
  }, []);

  console.log(typeof dateSubmission,"ddd");
  return (
    <MainLayout pageTitle={"Submit Invoice"}>
      <div className="row mt-2" style={{ maxWidth: "900px" }}>
        <div className="row col-6">
          <div className="col-12 mt-2 segoe-bold">
            <label htmlFor="Po">PO Number:</label>
          </div>
          <div className="col-12">
            <select
              id="purchase_order"
              name="purchase_order"
              className="form-control"
              placeholder="Select a purchase order"
              // onChange={(e) => setSelectedPO(e.target.value)}
              onChange={(e) => handleChange(e)}
              defaultValue={selectedPO?.id ? selectedPO.id : ""}
              // value={
              //   Array.isArray(data?.country_id)
              //     ? data?.country_id[0]
              //     : data?.country_id
              // }
            >
              <option value="">Select Purchase Order</option>
              {purchaseOrders?.map((item, index) => (
                <option
                  value={JSON.stringify(item)}
                  // value={item?.id}
                  key={index}
                >
                  {item?.display_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row col-6 mt-3">
          
        </div>
        <div className="row col-6 ">
          <div className="col-12 mt-2 segoe-bold">
            <label htmlFor="Po">Invoice Number:</label>
          </div>
          <div className="col-12 ">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="invoice_number"
                name="invoice_number"
                // value={data?.mobile ? data?.mobile : ""}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        </div>
        <div className="row col-6 mt-3">
          
        </div>

        <div className="row col-6 mt-2">
          <div className="col-12 mt-2 mb-2 segoe-bold">
            <label htmlFor="Po">Date of Submission:</label>
          </div>
          <div className="col-12 ">
            <TextField
              id="date"
              name="date"
              type="date"
              label="Date of Submission"
              
              defaultValue={dateSubmission ? dateSubmission : "2020/01/01"}

              value={dateSubmission ? dateSubmission : "" }
              // sx={{ width: 220 }}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="row col-6 mt-3">
          
        </div>

        <div className="row col-6 mt-2">
          <div className="col-12 mt-2 segoe-bold">
            <label htmlFor="Po">Invoice Copy:</label>
          </div>
          <div className="col-12 ">
            <div>
              <Button
                className="capitalize"
                size="small"
                variant="contained"
                onClick={() => fileInput?.current?.click()}
              >
                {file?.name ? file?.name : "Upload Invoice"}{" "}
                <input
                  ref={fileInput}
                  onChange={(e) => uploadPdfFile(e)}
                  type="file"
                  style={{ display: "none" }}
                  accept=".pdf"
                />{" "}
              </Button>
            </div>
            <div style={{ fontSize: "12px" }}>
              (Only PDF is accepted; max size 2 MB)
            </div>
          </div>
        </div>
        <div className="col-11 mt-2">
          {" "}
          <Button
            className="capitalize mt-5"
            size="small"
            variant="contained"
            color="secondary"
            onClick={sendFile}
          >
            Submit Invoice{" "}
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateBill;
