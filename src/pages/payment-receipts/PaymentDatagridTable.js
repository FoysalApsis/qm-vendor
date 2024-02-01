import React, { useCallback, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import serverAPI from "../../config/serverAPI";
import { useNavigate } from "react-router-dom";
import numbro from "numbro";
import { TablePagination } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { DataGrid } from '@mui/x-data-grid';
import DataTable from "../../components/layout/table/Table";
import { DataGrid } from "@mui/x-data-grid";

import Box from "@mui/material/Box";
import DatagridTable from "../../vendorComponents/table/DatagridTable";
import moment from "moment";


const PaymentDatagridTable = () => {
    const columns = [
        {
          field: "date",
          headerName: "Date",
          width: 150,
          valueGetter: (params) =>
                moment(params.row?.date).format("YYYY-MM-DD"),
          type:'date',
        },
        {
          field: "name",
          headerName: "Receipt Number",
          width: 200,
        },
        {
          field: "payment_method_line_id", 
          headerName: "Payment Method",
          width: 250,
          valueGetter: (params) => params.row?.payment_method_line_id?.[1],
        },
        {
          field: "amount_total",
          headerName: "Total Amount",
          width: 150,
          type: 'number',
          valueGetter: (params) => numbro(params.row?.amount_total).format({thousandSeparated:true,mantissa:2}),
        },
        {
          field: "currency_id", 
          headerName: "Currency",
          width: 100,
          valueGetter: (params) => params.row?.currency_id?.[1],
        },
        {
          field: "state",
          headerName: "Status",
          width: 200,
          renderCell: (params) => getStatus(params?.formattedValue),
        },
      ];


  const [paymentReceipt, setPaymentReceipt] = useState();
  
  const navigate = useNavigate()

  const getPayments = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("userObj"));
    const body = { jsonrpc: "2.0", params: { id: user.id } };
    await serverAPI
      .post(`get-payment-receipt`, body)
      .then((res) => {
        setPaymentReceipt(
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

  
  const getStatus = (status) => {
    if (status === "draft") {
      return <span style={{color:"#17A2B8"}}>In Progress</span>;
    } else if (status === "posted") {
      return <span style={{color:"#17A2B8"}}>In Progress</span>;
    } else if (status === "cancel") {
      return <span style={{color:"#DC3545"}}>Cancelled</span>;
    }
  };

  const rowClickEvent = (params) => {
    // navigate(`/my-purchase-order/${params.id}`);
    navigate(`/my-payment-receipt/${params.id}`)
  };

  useEffect(()=>{
    getPayments()
  },[])

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      {/* {paymentReceipt && ( */}
        <DatagridTable
          data={paymentReceipt || []}
          columns={columns}
          handleEvent={rowClickEvent}
        />
      {/* )} */}
    </Box>
  );
};

export default PaymentDatagridTable;
