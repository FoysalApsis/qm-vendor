import React, { useCallback, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PageLayout from "../../components/layout/pageLayout";
import PageHeader from "../../components/layout/pageHeader";
import serverAPI from "../../config/serverAPI";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Invoices = () => {
  const [bills, setBills] = useState([{}]);

  const rows = [...bills];
  const navigate = useNavigate();

  const handleCreateBill =()=>{
    navigate('/invoice/create-bill')
  }

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

  const getStatus = (status) => {
    if (status === "cancel") {
      return <span style={{ color: "red" }}>Cancelled</span>;
    } else {
      return <span style={{ color: "green" }}>Confirmed</span>;
    }
  };

  useEffect(() => {
    getBills();
  }, []);
  return (
    <div className="main-container">
      <PageLayout />
      <PageHeader title={"Invoices"}>
      <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={handleCreateBill}
        >
          Create Bill
        </Button>
      </PageHeader>
      
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={{
              "&.MuiTableHead-root": {
                backgroundColor: "#6c227c",
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
                <b style={{ color: "white" }}> Number </b>
              </TableCell>
              <TableCell align="center">
                {" "}
                <b style={{ color: "white" }}> Vendor </b>
              </TableCell>
              <TableCell align="center">
                <b style={{ color: "white" }}> Bill Date </b>
              </TableCell>
              <TableCell align="center">
                {" "}
                <b style={{ color: "white" }}> Due Date </b>
              </TableCell>
              <TableCell align="center">
                {" "}
                <b style={{ color: "white" }}> Total </b>
              </TableCell>
              <TableCell align="center">
                {" "}
                <b style={{ color: "white" }}> Payment Status </b>
              </TableCell>
              <TableCell align="center">
                {" "}
                <b style={{ color: "white" }}> Status </b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => navigator(row.id)}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">
                  {row.invoice_partner_display_name}
                </TableCell>
                <TableCell align="center">{row.invoice_date}</TableCell>
                <TableCell align="center">{row.invoice_date_due}</TableCell>
                <TableCell align="center">{row.amount_total_signed}</TableCell>
                <TableCell align="center">{row.payment_state}</TableCell>
                <TableCell align="center">{row.state}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Invoices;
