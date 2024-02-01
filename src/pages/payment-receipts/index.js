import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import numbro from "numbro";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/mainLayout";
import PageHeader from "../../components/layout/pageHeader";
import PageLayout from "../../components/layout/pageLayout";
import serverAPI from "../../config/serverAPI";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SectionHeading from "../../components/layout/SectionHeading";
import moment from "moment";
import DatagridTable from "../../vendorComponents/table/DatagridTable";
import PaymentDatagridTable from "./PaymentDatagridTable";
// import PaymentDatagrid from "./paymentDatagrid";


const PaymentReceipts = () => {

  // const columns = [
  //   {
  //     field: "date",
  //     headerName: "Date",
  //     width: 150,
  //     valueGetter: (params) =>
  //           moment(params.row?.date).format("YYYY-MM-DD"),
  //   },
  //   {
  //     field: "name",
  //     headerName: "Receipt Number",
  //     width: 200,
  //   },
  //   {
  //     field: "payment_method_line_id", 
  //     headerName: "Payment Method",
  //     width: 250,
  //     valueGetter: (params) => params.row?.payment_method_line_id?.[1],
  //   },
  //   {
  //     field: "amount_total",
  //     headerName: "Total Amount",
  //     width: 150,
  //     valueGetter: (params) => numbro(params.row?.amount_total).format({thousandSeparated:true,mantissa:2}),
  //   },
  //   {
  //     field: "currency_id", 
  //     headerName: "Currency",
  //     width: 100,
  //     valueGetter: (params) => params.row?.currency_id?.[1],
  //   },
  //   {
  //     field: "state",
  //     headerName: "Status",
  //     width: 200,
  //     renderCell: (params) => getStatus(params?.formattedValue),
  //   },
  // ];

  const [paymentReceipt, setPaymentReceipt] = useState();
  // const rows = [
  //   ...paymentReceipt
  // ];

  const navigate = useNavigate()

  const navigator = (id)=>{
    navigate(`/my-payment-receipt/${id}`)
  }

  const [page, setPage] =useState(0);
  const [rowsPerPage, setRowsPerPage] =useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
    <MainLayout pageTitle={"My Payment Receipts"} >
         <SectionHeading title={"My Payment Receipts"} divider={false} ></SectionHeading>

      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={{
              "&.MuiTableHead-root": {
                backgroundColor: "#F5F5F5",
              },
            }}
          >
            <TableRow
              sx={{
                "&.MuiTableRow-root": {
                  color: "#5F6D7E",
                },
              }}
            >
              <TableCell sx={{ borderRight: '1px solid white' }}>
                <div className="flex justify-between items-center">

                  <b className="text-[13px]" style={{ color: "#5F6D7E" }}> Date </b>
                  <MoreVertIcon fontSize="small" sx={{ color: "#5F6D7E" }}></MoreVertIcon>
                </div>
              </TableCell>
              <TableCell   sx={{ borderRight: '1px solid white' }}>
                <div className="flex justify-between items-center">

                  <b className="text-[13px]" style={{ color: "#5F6D7E" }}> Receipt Number </b>
                  <MoreVertIcon fontSize="small" sx={{ color: "#5F6D7E" }}></MoreVertIcon>
                </div>
              </TableCell>
              <TableCell   sx={{ borderRight: '1px solid white' }}>
                <div className="flex justify-between items-center">
                  <b className="text-[13px]" style={{ color: "#5F6D7E" }}> Payment Method </b>
                  <MoreVertIcon fontSize="small" sx={{ color: "#5F6D7E" }}></MoreVertIcon>
                </div>
              </TableCell>
              <TableCell   sx={{ borderRight: '1px solid white' }}>
                <div className="flex justify-between items-center">
                  <b className="text-[13px]" style={{ color: "#5F6D7E" }}> Total Amount </b>
                  <MoreVertIcon fontSize="small" sx={{ color: "#5F6D7E" }}></MoreVertIcon>
                </div>
              </TableCell>
              <TableCell   sx={{ borderRight: '1px solid white' }}>
                <div className="flex justify-between items-center">
                  <b className="text-[13px]" style={{ color: "#5F6D7E" }}> Currency </b>
                  <MoreVertIcon fontSize="small" sx={{ color: "#5F6D7E" }}></MoreVertIcon>
                </div>
              </TableCell>
              <TableCell   sx={{ borderRight: '1px solid white' }}>
                <div className="flex justify-between items-center">
                  <b className="text-[13px]" style={{ color: "#5F6D7E" }}> Status  </b>
                  <MoreVertIcon fontSize="small" sx={{ color: "#5F6D7E" }}></MoreVertIcon>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                key={row?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => navigator(row.id)}
                style={{ cursor: "pointer" }}
                className="bg-[#F8F8F8]"

              >
                <TableCell component="th" scope="row">
                  {row?.date}
                </TableCell>
                <TableCell  >{row?.name}</TableCell>
                <TableCell  >
                  {row?.payment_method_line_id?.[1]}
                </TableCell>
                <TableCell  >{numbro(row?.amount_total).format({thousandSeparated:true,mantissa:2})}</TableCell>
                <TableCell  >
                        {row?.currency_id?.[1]}
                      </TableCell>
                      <TableCell  >{getStatus(row?.state)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {rows.length > 0 && 
        <TablePagination
          className="bg-[#F8F8F8]"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          
          />}
      </TableContainer> */}
  {/* { paymentReceipt && (
      <DatagridTable data={paymentReceipt} columns={columns} handleEvent={rowClickEvent} ></DatagridTable>)
      } */}

      <PaymentDatagridTable></PaymentDatagridTable>
      </MainLayout >
  );
};

export default PaymentReceipts;
