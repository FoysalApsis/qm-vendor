import React, { useCallback, useEffect, useState } from "react";
import serverAPI from "../../config/serverAPI";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import DatagridTable from "../../vendorComponents/table/DatagridTable";
import moment from "moment";
const InvoiceDatagridTable = () => {
    const columns = [
        {
          field: "date_of_submission",
          headerName: "Date of Submission",
          width: 150,
          type:'date',
          valueGetter: (params) =>
            moment(params.row?.date_of_submission).format("YYYY-MM-DD"),
        },
        {
          field: "po_id",
          headerName: "PO Number",
          width: 200,
          valueGetter: (params) => params.row.po_id[1],
        },
        {
          field: "invoice_number",
          headerName: "Invoice Number",
          width: 200,
        },
        {
          field: "invoice_amount",
          headerName: "Invoiced Amount",
          type: 'number',
          width: 150,
        },
        {
          field: "approve_amount",
          headerName: "Approved Amount",
          type: 'number',
          width: 150,
        },
        {
          field: "dispute_amount",
          headerName: "Disputed Amount",
          type: 'number',
          width: 150,
        },
        {
          field: "document_name",
          headerName: "Invoice Copy",
          width: 350,
          renderCell: (params) => (
            <>
              <span> {params?.row?.document_name} </span>
              {params?.row?.document_name && (
                <span
                  onClick={() => downloadPDF(params?.row?.pdf_name)}
                  style={{ cursor: "pointer" }}
                >
                  <DownloadIcon />
                </span>
              )}
            </>
          ),
        },
      
        {
          field: "state",
          headerName: "Status",
          width: 200,
      
          renderCell: (params) => getInvoiceStatus(params?.formattedValue),
        },
        {
          field: "notes",
          headerName: "Notes",
          width: 200,
          valueGetter: (params) => params.row.notes ? params.row.notes : "-" ,
        },
      ];

  const [purchaseOrders, setPurchaseOrders] = useState();
  const [submittedInvoice, setSubmittedInvoice] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatus = (status) => {
    if (status === "cancel") {
      return <span style={{ color: "red" }}>Cancelled</span>;
    } else {
      return <span style={{ color: "green" }}>Confirmed</span>;
    }
  };
  const navigate = useNavigate();

  const getInvoiceStatus = (status) => {
    if (status === "done") {
      return <span>Accepted</span>;
    } else if (status === "pending") {
      return <span>Pending Review</span>;
    } else if (status === "cancel") {
      return <span>Rejected</span>;
    }
  };
  const downloadPDF = (arg) => {
    const fileName = arg?.replace(/ /g, "-");
    let a = document.createElement("a");
    a.setAttribute("download", true);
    a.setAttribute("target", "_blank");
    a.setAttribute(
      "href",
      `${process.env.REACT_APP_API_URL}/uploads/${fileName}`
    );
    a.click();
  };

  const getSubmittedInvoice = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("userObj"));
    const body = { jsonrpc: "2.0", params: { vendor_id: user.id } };
    await serverAPI
      .post(`get-submitted-invoice`, body)
      .then((res) => {
        setSubmittedInvoice(
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

  useEffect(() => {
    getSubmittedInvoice();
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      {/* {submittedInvoice && ( */}
        <DatagridTable data={submittedInvoice || []} columns={columns} />
       {/* )} */}
    </Box>
  );
};

export default InvoiceDatagridTable;
