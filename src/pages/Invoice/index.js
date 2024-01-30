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
import DownloadIcon from "@mui/icons-material/Download";
import MainLayout from "../../components/layout/mainLayout";
import InvoiceStatusTable from "./InvoiceStatusTable";
import { Button, CircularProgress, TablePagination } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SectionHeading from "../../components/layout/SectionHeading";
import moment from "moment";

const Invoices = () => {
  const [bills, setBills] = useState([{}]);
  const [submittedInvoice, setSubmittedInvoice] = useState([{}]);
  const rows = [...bills];
  let submittedRows = [...submittedInvoice];

  const navigate = useNavigate();

  const handleCreateBill = () => {
    navigate("/invoice/create-bill");
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
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
        console.log(res)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  
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

  const getInvoiceStatus = (status) => {
    if (status === "done") {
      return <span>Accepted</span>;
    } else if (status === "pending") {
      return <span>Pending Review</span>;
    } else if (status === "cancel") {
      return <span>Rejected</span>;
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
    <MainLayout
      pageTitle={"My Invoices"}
      buttonName={"Submit Invoice"}
      onButtonClick={handleCreateBill}
    >
      {/* <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={handleCreateBill}
        >
          Submit Invoice
        </Button> */}
        <SectionHeading title={"Submitted Invoices"} divider={false}> <Button
          type="submit"
          variant="contained"
          onClick={handleCreateBill}
          className="h-8 segoe-normal capitalize !bg-[#0D3875]"
          style={{
            textTransform: "capitalize",
          }}
        >
          Submit Invoice
        </Button></SectionHeading>
      {/* <div className=" flex justify-between items-center mb-3">
        <div className="table-title ">Submitted Invoices</div>
       
      </div> */}

      <TableContainer component={Paper} style={{ marginBottom: "3rem" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {/* <TableHead
            sx={{
              "&.MuiTableHead-root": {
                backgroundColor: "#323130",
              },
            }}
          >
            <TableRow
              sx={{
                "&.MuiTableRow-root": {
                  color: "#F8F8F8",
                },
              }}
            >
              <TableCell>
                {" "}
                <b style={{ color: "white" }}> Date of Submission </b>
              </TableCell>
              <TableCell  >
                {" "}
                <b style={{ color: "white" }}> PO Number </b>
              </TableCell>
              <TableCell  >
                <b style={{ color: "white" }}>Invoice Number</b>
              </TableCell>
              <TableCell  >
                {" "}
                <b style={{ color: "white" }}>Invoice Copy </b>
              </TableCell>
              <TableCell  >
                {" "}
                <b style={{ color: "white" }}>Status </b>
              </TableCell>
              <TableCell  >
                {" "}
                <b style={{ color: "white" }}>Notes</b>
              </TableCell>
            </TableRow>
          </TableHead> */}
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
              <TableCell sx={{ borderRight: "1px solid white" }}>
                <div className="flex justify-between items-center">
                  <b className="text-[13px]" style={{ color: "#5F6D7E" }}>
                    Date of Submission{" "}
                  </b>
                  <MoreVertIcon
                    fontSize="small"
                    sx={{ color: "#5F6D7E" }}
                  ></MoreVertIcon>
                </div>
              </TableCell>
              <TableCell   sx={{ borderRight: "1px solid white" }}>
                <div className="flex justify-between items-center">
                  <b className="text-[13px]" style={{ color: "#5F6D7E" }}>
                    {" "}
                    PO Number{" "}
                  </b>
                  <MoreVertIcon
                    fontSize="small"
                    sx={{ color: "#5F6D7E" }}
                  ></MoreVertIcon>
                </div>
              </TableCell>
              <TableCell   sx={{ borderRight: "1px solid white" }}>
                <div className="flex justify-between items-center">
                  <b className="text-[13px]" style={{ color: "#5F6D7E" }}>
                    {" "}
                    Invoice Number{" "}
                  </b>
                  <MoreVertIcon
                    fontSize="small"
                    sx={{ color: "#5F6D7E" }}
                  ></MoreVertIcon>
                </div>
              </TableCell>
              <TableCell   sx={{ borderRight: "1px solid white" }}>
                <div className="flex justify-between items-center">
                  <b className="text-[13px]" style={{ color: "#5F6D7E" }}>
                    {" "}
                    Invoice Amount{" "}
                  </b>
                  <MoreVertIcon
                    fontSize="small"
                    sx={{ color: "#5F6D7E" }}
                  ></MoreVertIcon>
                </div>
              </TableCell>
              <TableCell   sx={{ borderRight: "1px solid white" }}>
                <div className="flex justify-between items-center">
                  <b className="text-[13px]" style={{ color: "#5F6D7E" }}>
                    {" "}
                    Approved Amount{" "}
                  </b>
                  <MoreVertIcon
                    fontSize="small"
                    sx={{ color: "#5F6D7E" }}
                  ></MoreVertIcon>
                </div>
              </TableCell>
              <TableCell   sx={{ borderRight: "1px solid white" }}>
                <div className="flex justify-between items-center">
                  <b className="text-[13px]" style={{ color: "#5F6D7E" }}>
                    {" "}
                    Disputed Amount{" "}
                  </b>
                  <MoreVertIcon
                    fontSize="small"
                    sx={{ color: "#5F6D7E" }}
                  ></MoreVertIcon>
                </div>
              </TableCell>
              <TableCell   sx={{ borderRight: "1px solid white" }}>
                <div className="flex justify-between items-center">
                  <b className="text-[13px]" style={{ color: "#5F6D7E" }}>
                    {" "}
                    Invoice Copy{" "}
                  </b>
                  <MoreVertIcon
                    fontSize="small"
                    sx={{ color: "#5F6D7E" }}
                  ></MoreVertIcon>
                </div>
              </TableCell>
              <TableCell   sx={{ borderRight: "1px solid white" }}>
                <div className="flex justify-between items-center">
                  <b className="text-[13px]" style={{ color: "#5F6D7E" }}>
                    Status
                  </b>
                  <MoreVertIcon
                    fontSize="small"
                    sx={{ color: "#5F6D7E" }}
                  ></MoreVertIcon>
                </div>
              </TableCell>
              <TableCell   sx={{ borderRight: "1px solid white" }}>
                <div className="flex justify-between items-center">
                  <b className="text-[13px]" style={{ color: "#5F6D7E" }}>
                    {" "}
                    Notes{" "}
                  </b>
                  <MoreVertIcon
                    fontSize="small"
                    sx={{ color: "#5F6D7E" }}
                  ></MoreVertIcon>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submittedRows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className="bg-[#F8F8F8]"
                >
                  <TableCell component="th" scope="row">
                    {moment(row?.date_of_submission).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell  >{row?.po_id?.[1]}</TableCell>
                  <TableCell  >{row?.invoice_number}</TableCell>
                  <TableCell  >{row?.invoice_amount}</TableCell>
                  <TableCell  >{row?.approve_amount}</TableCell>
                  <TableCell  >{row?.dispute_amount}</TableCell>
                  <TableCell  >
                    <span> {row?.document_name} </span>
                    {row?.document_name && (
                      <span
                        onClick={() => downloadPDF(row?.pdf_name)}
                        style={{ cursor: "pointer" }}
                      >
                        <DownloadIcon />
                      </span>
                    )}
                  </TableCell>
                  <TableCell  >
                    {getInvoiceStatus(row?.state)}
                  </TableCell>
                  <TableCell  >{row?.notes}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {submittedRows.length > 0 && (
          <TablePagination
            className="bg-[#F8F8F8]"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={submittedRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </TableContainer>
      <SectionHeading title={"Invoice Status"} divider={false} ></SectionHeading>
      <InvoiceStatusTable></InvoiceStatusTable>
     
    </MainLayout>
  );
};

export default Invoices;
