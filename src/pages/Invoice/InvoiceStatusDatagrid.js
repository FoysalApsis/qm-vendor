import React, { useCallback, useEffect, useState } from "react";
import serverAPI from "../../config/serverAPI";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import DatagridTable from "../../vendorComponents/table/DatagridTable";
import numbro from "numbro";
const InvoiceStatusDatagrid = () => {
   const columns = [

  {
    field: "name",
    headerName: "QM Bill Number",
    width: 150,
    // valueGetter: (params) =>
    //   moment(params.row?.date_of_submission).format("YYYY-MM-DD"),
  },
  {
    field: "invoice_partner_display_name",
    headerName: "Vendor",
    width: 200,
    
  },
  {
    field: "invoice_date",
    headerName: "Bill Date",
    type:'date',
    width: 150,
    valueGetter: (params) => params?.row?.invoice_date ? params?.row?.invoice_date : "-" 
  },
  {
    field: "invoice_date_due",
    headerName: "Due Date",
    type:'date',
    width: 150,
  },
  {
    field: "tax_totals",
    headerName: "Total Amount",
    width: 150,
    type: 'number',
     valueGetter: (params) =>
     numbro(params?.row?.tax_totals?.amount_total).format({ thousandSeparated: true, mantissa: 2 }),
  },
  {
    field: "currency_id",
    headerName: "Currency",
    width: 150,
  },
  {
    field: "payment_state",
    headerName: "Payment Status",
    width: 150,
    renderCell: (params) => getPaymentStatus(params?.row?.payment_state)
  },

  {
    field: "state",
    headerName: "Status",
    width: 150,

    renderCell: (params) => getStatus(params?.row?.state,params?.row?.payment_state),
  },

];
 

const [bills, setBills] = useState();

useEffect(() => {
  getBills();
}, []);

const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(10);
const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = event => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};



const getBills = useCallback(async () => {
  const user = JSON.parse(localStorage.getItem("userObj"));
  const body = { jsonrpc: "2.0", params: { id: user.id } };
  await serverAPI
    .post(`get-bills`, body)
    .then((res) => {
      setBills(
        res?.data?.response.map((elm) => {
          return {
            ...elm,
          };
        })
      );
    })
    .catch((err) => {
      console.log(err.message);
    });
}, []);

const getStatus = (status,payment_status) => {
  if (status === "draft") {
    return <span style={{color:"#17A2B8"}}>In Progress</span>;
  } else if (status === "posted") {
    return <span style={{color:"#17A2B8"}}>In Progress</span>;
  } else if (status === "cancel") {
    return <span style={{color:"#DC3545"}}>Cancelled</span>;
  } else if (payment_status === "paid") {
    return <span style={{color:"#28A745"}}>Complete</span>;
  }
};

const getPaymentStatus = (param) => {
  if (param === "not_paid") {
    return <span>Not Paid</span>;
  } else if (param === "in_payment") {
    return <span>In Payment</span>;
  } else if (param === "paid") {
    return <span>Paid</span>;
  } else if (param === "partial") {
    return <span>Partially Paid</span>;
  } else if (param === "reversed") {
    return <span>Reversed</span>;
  } else if (param === "invoicing_legacy") {
    return <span>Invoicing App Legacy</span>;
  }
};


  return (
    <Box sx={{ height: 400, width: "100%" }}>
      {/* {bills && ( */}
        <DatagridTable data={bills || []} columns={columns} />
      {/* )} */}
    </Box>
  );
};

export default InvoiceStatusDatagrid;
