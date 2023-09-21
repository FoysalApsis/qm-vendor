import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const InvoiceTable = ({ isDashboard = false }) => {
  const rows = [];

  const getStatus = (status) => {
    if (status === "draft") {
      return <span>Draft</span>;
    } else if (status === "posted") {
      return <span>Posted</span>;
    } else if (status === "cancel") {
      return <span>Cancelled</span>;
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
    <TableContainer component={Paper}>
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
            <TableCell>
              {" "}
              <b style={{ color: "white" }}>Invoice Number </b>
            </TableCell>
            <TableCell  >
              {" "}
              <b style={{ color: "white" }}> Vendor </b>
            </TableCell>
            <TableCell  >
              <b style={{ color: "white" }}> Bill Date </b>
            </TableCell>
            <TableCell  >
              {" "}
              <b style={{ color: "white" }}> Due Date </b>
            </TableCell>
            <TableCell  >
              {" "}
              <b style={{ color: "white" }}> Total Amount </b>
            </TableCell>
            <TableCell  >
              {" "}
              <b style={{ color: "white" }}> Payment Status </b>
            </TableCell>
            <TableCell  >
              {" "}
              <b style={{ color: "white" }}> Status </b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row?.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              // onClick={() => navigator(row?.id)}
              // style={{backgroundColor:"#F8F8F8"}}
              className="bg-[#F8F8F8]"
            >
              <TableCell component="th" scope="row">
                {row?.name}
              </TableCell>
              <TableCell  >
                {row?.invoice_partner_display_name}
              </TableCell>
              <TableCell  >{row?.invoice_date}</TableCell>
              <TableCell  >{row?.invoice_date_due}</TableCell>
              <TableCell  >
                {parseInt(row?.tax_totals?.amount_total).toFixed(0)}
              </TableCell>
              <TableCell  >
                {getPaymentStatus(row?.payment_state)}
              </TableCell>
              <TableCell  >{getStatus(row?.state)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceTable;
