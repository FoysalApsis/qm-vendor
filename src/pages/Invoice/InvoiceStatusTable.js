import React, { useCallback, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import serverAPI from "../../config/serverAPI";
import { TablePagination } from "@mui/material";
import numbro from "numbro";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const InvoiceStatusTable = ({ isDashboard = false }) => {

  const [bills, setBills] = useState([{}]);

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

  const rows = [
    ...bills
  ];


  const amount = (int) => {
    if (int) {
      return parseInt(int).toFixed(0)
    }
  }

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
            <TableCell sx={{borderRight:'1px solid white'}}>
              <div className="flex justify-between items-center">

                <b className="text-[13px]" style={{ color: "#5F6D7E" }}>QM Bill Number </b>
                <MoreVertIcon fontSize="small" sx={{color:"#5F6D7E"}}></MoreVertIcon>
              </div>
            </TableCell>
            <TableCell   sx={{borderRight:'1px solid white'}}>
              <div className="flex justify-between items-center">

                <b className="text-[13px]" style={{ color: "#5F6D7E" }}> Vendor </b>
                <MoreVertIcon fontSize="small" sx={{color:"#5F6D7E"}}></MoreVertIcon>
              </div>
            </TableCell>
            <TableCell   sx={{borderRight:'1px solid white'}}>
              <div className="flex justify-between items-center">
                <b className="text-[13px]" style={{ color: "#5F6D7E" }}> Bill Date </b>
                <MoreVertIcon fontSize="small" sx={{color:"#5F6D7E"}}></MoreVertIcon>
              </div>
            </TableCell>
            <TableCell   sx={{borderRight:'1px solid white'}}>
              <div className="flex justify-between items-center">
                <b className="text-[13px]" style={{ color: "#5F6D7E" }}> Due Date </b>
                <MoreVertIcon fontSize="small" sx={{color:"#5F6D7E"}}></MoreVertIcon>
              </div>
            </TableCell>
            <TableCell   sx={{borderRight:'1px solid white'}}>
              <div className="flex justify-between items-center">
                <b className="text-[13px]" style={{ color: "#5F6D7E" }}> Total Amount </b>
                <MoreVertIcon fontSize="small" sx={{color:"#5F6D7E"}}></MoreVertIcon>
              </div>
            </TableCell>
            <TableCell   sx={{borderRight:'1px solid white'}}>
              <div className="flex justify-between items-center">


                <b className="text-[13px]" style={{ color: "#5F6D7E" }}> Currency </b>
                <MoreVertIcon fontSize="small" sx={{color:"#5F6D7E"}}></MoreVertIcon>
              </div>
            </TableCell>
            <TableCell   sx={{borderRight:'1px solid white'}}>
              <div className="flex justify-between items-center">


                <b className="text-[13px]" style={{ color: "#5F6D7E" }}> Payment Status </b>
                <MoreVertIcon fontSize="small" sx={{color:"#5F6D7E"}}></MoreVertIcon>
              </div>
            </TableCell>
            <TableCell   >
              <div className="flex justify-between items-center">
                <b className="text-[13px]" style={{ color: "#5F6D7E" }}> Status </b>
                <MoreVertIcon fontSize="small" sx={{color:"#5F6D7E"}}></MoreVertIcon>
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => (
              isDashboard ? index < 3 &&
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
                    {/* {  amount(row?.tax_totals?.amount_total) } */}
                    {numbro(row?.tax_totals?.amount_total).format({ thousandSeparated: true, mantissa: 2 })}
                  </TableCell>
                  <TableCell  >
                    {row?.currency_id}
                  </TableCell>
                  <TableCell  >
                    {getPaymentStatus(row?.payment_state)}
                  </TableCell>
                  <TableCell  >{getStatus(row?.state)}</TableCell>
                </TableRow>
                : <TableRow
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
                    {/* {parseInt(row?.tax_totals?.amount_total).toFixed(0)} */}
                    {numbro(row?.tax_totals?.amount_total).format({ thousandSeparated: true, mantissa: 2 })}

                  </TableCell>
                  <TableCell  >
                    {row?.currency_id}
                  </TableCell>
                  <TableCell  >
                    {getPaymentStatus(row?.payment_state)}
                  </TableCell>
                  <TableCell  >{getStatus(row?.state)}</TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
      {rows.length > 0 && (!isDashboard && <TablePagination
        className="bg-[#F8F8F8]"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}

      />)}
    </TableContainer>
  );
};


export default InvoiceStatusTable;
