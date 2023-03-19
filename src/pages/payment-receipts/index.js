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
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/mainLayout";
import PageHeader from "../../components/layout/pageHeader";
import PageLayout from "../../components/layout/pageLayout";
import serverAPI from "../../config/serverAPI";

const PaymentReceipts = () => {
  const [paymentReceipt, setPaymentReceipt] = useState([]);
  const rows = [
    ...paymentReceipt
  ];

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
      return <span>Draft</span>;
    } else if (status === "posted") {
      return <span>Posted</span>;
    } else if (status === "cancel") {
      return <span>Cancelled</span>;
    }
  };

  useEffect(()=>{
    getPayments()
  },[])

  return (
    <MainLayout pageTitle={"My Payment Receipts"} >

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={{
              "&.MuiTableHead-root": {
                backgroundColor: "#323130",
              },
            }}
          >
            <TableRow
              sx={{
                "&.MuiTableRow-root": {
                  color: "white",
                },
              }}
            >
              <TableCell>
                {" "}
                <b style={{ color: "white" }}> Date </b>
              </TableCell>
              <TableCell align="center">
                {" "}
                <b style={{ color: "white" }}>Receipt Number </b>
              </TableCell>
              {/* <TableCell align="center">
                <b style={{ color: "white" }}> Journal </b>
              </TableCell> */}
              <TableCell align="center">
                {" "}
                <b style={{ color: "white" }}> Payment Method </b>
              </TableCell>
              <TableCell align="center">
                {" "}
                <b style={{ color: "white" }}> Total Amount </b>
              </TableCell>
              {/* <TableCell align="center">
                {" "}
                <b style={{ color: "white" }}> Status </b>
              </TableCell> */}
              {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
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
                <TableCell align="center">{row?.name}</TableCell>
                {/* <TableCell align="center">{row?.journal_id?.[1]}</TableCell> */}
                <TableCell align="center">
                  {row?.payment_method_line_id?.[1]}
                </TableCell>
                <TableCell align="center">{row?.amount_total}</TableCell>
                {/* <TableCell align="center">{getStatus(row?.state)}</TableCell> */}
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
      </TableContainer>
      </MainLayout >
  );
};

export default PaymentReceipts;
