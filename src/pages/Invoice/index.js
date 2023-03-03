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
import DownloadIcon from "@mui/icons-material/Download";

const Invoices = () => {
  const [bills, setBills] = useState([{}]);
  const [submittedInvoice, setSubmittedInvoice] = useState([{}]);
  const rows = [...bills];
  let submittedRows = [ ...submittedInvoice];
 
  const navigate = useNavigate();

  const handleCreateBill = () => {
    navigate("/invoice/create-bill");
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
  const getSubmittedInvoice = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("userObj"));
    const body = { jsonrpc: "2.0", params: { vendor_id: user.id } };
    await serverAPI
      .post(`get-submitted-invoice`, body)
      .then((res) => {
        setSubmittedInvoice(
          res?.data?.response.map((elm) => {
            console.log(elm,"elm[0");
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
  // const getSubmittedInvoice = useCallback(async () => {
  //   const body = { jsonrpc: "2.0", params: { submit_invoice } };
  //   await serverAPI
  //     .post(`get-submitted-invoice`, body)
  //     .then((res) => {
  //       setBills(
  //         res?.data?.response.map((elm) => {
  //           return {
  //             ...elm,
  //           };
  //         })
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

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

  useEffect(() => {
    getBills();
    getSubmittedInvoice();
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
          Submit Invoice
        </Button>
      </PageHeader>

      <div>
        <div>Submitted Invoices</div>
        <TableContainer component={Paper} style={{ marginBottom: "3rem" }}>
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
                  <b style={{ color: "white" }}> Date of Submission </b>
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <b style={{ color: "white" }}> PO Number </b>
                </TableCell>
                <TableCell align="center">
                  <b style={{ color: "white" }}>Invoice Number</b>
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <b style={{ color: "white" }}>Invoice Copy </b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(submittedRows[0]).length ?
                submittedRows?.map((row) => (
                  <TableRow
                    key={row?.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    // onClick={() => navigator(row?.id)}
                  >
                    <TableCell component="th" scope="row">
                      {row?.date_of_submission}
                    </TableCell>
                    <TableCell align="center">{row?.po_id[1]}</TableCell>
                    <TableCell align="center">{row?.invoice_number}</TableCell>
                    <TableCell align="center">
                      <span> {row?.document_name} </span>
                      <span
                        onClick={() => downloadPDF(row?.pdf_name)}
                        style={{ cursor: "pointer" }}
                      >
                        <DownloadIcon />
                      </span>
                    </TableCell>
                  </TableRow>
                )): ""}
            </TableBody>
          </Table>
        </TableContainer>
        <div>Invoice Status</div>
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
                  <b style={{ color: "white" }}>Invoice Number </b>
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
                  <b style={{ color: "white" }}> Total Amount </b>
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
              {rows?.map((row) => (
                <TableRow
                  key={row?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  // onClick={() => navigator(row?.id)}
                >
                  <TableCell component="th" scope="row">
                    {row?.name}
                  </TableCell>
                  <TableCell align="center">
                    {row?.invoice_partner_display_name}
                  </TableCell>
                  <TableCell align="center">{row?.invoice_date}</TableCell>
                  <TableCell align="center">{row?.invoice_date_due}</TableCell>
                  <TableCell align="center">
                    {parseInt(row?.tax_totals?.amount_total).toFixed(0)}
                  </TableCell>
                  <TableCell align="center">
                    {getPaymentStatus(row?.payment_state)}
                  </TableCell>
                  <TableCell align="center">{getStatus(row?.state)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Invoices;
