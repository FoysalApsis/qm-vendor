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
import errorHandle from "../../utils/errorHandle";


const PoTable2 = () => {
  const columns = [
    {
      field: "display_name",
      headerName: "PO Number",
      width: 150,
    },
    {
      field: "partner_id",
      headerName: "Vendor",
      width: 200,
    },
    {
      field: "company_id",
      headerName: "Order From",
      width: 250,
    },
    {
      field: "date_order",
      headerName: "Order Deadline",
      type:'date',
      width: 150,
    },
    {
      field: "amount_total",
      headerName: "Total Amount",
      width: 150,
      type: 'number',
    },
    {
      field: "currency_id",
      headerName: "Currency",
      width: 100,
    },
    {
      field: "state",
      headerName: "Status",
      width: 200,

      renderCell: (params) => getStatus(params?.formattedValue),
    },
  ];

  const [purchaseOrders, setPurchaseOrders] = useState();
  const [loading,setLoading]= useState(true)

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

  const rowClickEvent = (params) => {
    navigate(`/my-purchase-order/${params.id}`);
  };

  const getMyPO = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("userObj"));
    const body = { jsonrpc: "2.0", params: { id: user.id } };
    await serverAPI
      .post(`get-my-po`, body)
      .then((res) => {
        setLoading(false)
        setPurchaseOrders(
          res?.data?.response.map((elm) => {
            return {
              id: elm[0].id,
              display_name: elm[0].display_name,
              company_id: elm[0].company_id[1],
              partner_id: elm[0].partner_id[1],
              date_order: elm[0].date_order.split(" ")[0],
              amount_total: numbro(elm[0].tax_totals.amount_total).format({
                thousandSeparated: true,
                mantissa: 2,
              }),
              state: elm[0].state,
              currency_id: elm[0].currency_id[1],
            };
          })
        );
      })
      .catch((err) => {
        errorHandle(err)
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    getMyPO();
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      {/* {purchaseOrders && ( */}
        <DatagridTable
          data={purchaseOrders || []}
          columns={columns}
          handleEvent={rowClickEvent}
          loading={loading}
        />
      {/* )} */}
    </Box>
  );
};

export default PoTable2;
