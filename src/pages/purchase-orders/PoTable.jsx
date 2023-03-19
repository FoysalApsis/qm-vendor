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
import {
  Box,
  IconButton,
  TableFooter,
  TablePagination,
  Typography,
  useTheme,
} from "@mui/material";
// import TablePagination from "@material-ui/core/TablePagination";
import MainLayout from "../../components/layout/mainLayout";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { DataGrid } from "@mui/x-data-grid";

const PoTable = ({ isDashboard = false }) => {
  const [purchaseOrders, setPurchaseOrders] = useState([{}]);


  const [page, setPage] =useState(0);
  const [rowsPerPage, setRowsPerPage] =useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
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


  const rows = [
    ...purchaseOrders
  ];

  const navigate = useNavigate();

  const navigator = (id) => {
    if (!isDashboard) {
      navigate(`/my-purchase-order/${id}`);
    }
  };

  const getMyPO = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("userObj"));
    const body = { jsonrpc: "2.0", params: { id: user.id } };
    await serverAPI
      .post(`get-my-po`, body)
      .then((res) => {
        setPurchaseOrders(
          res?.data?.response.map((elm) => {
            return {
              id: elm[0].id,
              display_name: elm[0].display_name,
              company_id: elm[0].company_id[1],
              partner_id: elm[0].partner_id[1],
              date_order: elm[0].date_order,
              amount_total: elm[0].tax_totals.amount_total,
              state: elm[0].state,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    getMyPO();
  }, []);
  return (
    <>
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
                <b style={{ color: "white" }}> PO Number </b>
              </TableCell>
              <TableCell align="center">
                {" "}
                <b style={{ color: "white" }}> Vendor </b>
              </TableCell>
              <TableCell align="center">
                <b style={{ color: "white" }}> Order From </b>
              </TableCell>
              <TableCell align="center">
                {" "}
                <b style={{ color: "white" }}> Order Deadline </b>
              </TableCell>
              <TableCell align="center">
                {" "}
                <b style={{ color: "white" }}> Total Amount </b>
              </TableCell>
              <TableCell align="center">
                {" "}
                <b style={{ color: "white" }}> Status </b>
              </TableCell>
              {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) =>
                isDashboard ? (
                  index < 3 && (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      onClick={() => navigator(row.id)}
                      style={{ cursor: "pointer" }}
                      className="bg-[#F8F8F8]"
                    >
                      <TableCell component="th" scope="row">
                        {row.display_name}
                      </TableCell>
                      <TableCell align="center">{row.partner_id}</TableCell>
                      <TableCell align="center">{row.company_id}</TableCell>
                      <TableCell align="center">
                        {row?.date_order?.split(" ")[0]}
                      </TableCell>
                      <TableCell align="center">{row.amount_total}</TableCell>
                      {/* <TableCell align="center">{row.state === 'cancel' ? "Cancelled" : "Confirmed"}</TableCell> */}
                      <TableCell align="center">
                        {getStatus(row.state)}
                      </TableCell>
                      {/* <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
                    </TableRow>
                  )
                ) : (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => navigator(row.id)}
                    style={{ cursor: "pointer" }}
                    className="bg-[#F8F8F8]"
                  >
                    <TableCell component="th" scope="row">
                      {row.display_name}
                    </TableCell>
                    <TableCell align="center">{row.partner_id}</TableCell>
                    <TableCell align="center">{row.company_id}</TableCell>
                    <TableCell align="center">
                      {row?.date_order?.split(" ")[0]}
                    </TableCell>
                    <TableCell align="center">{row.amount_total}</TableCell>
                    {/* <TableCell align="center">{row.state === 'cancel' ? "Cancelled" : "Confirmed"}</TableCell> */}
                    <TableCell align="center">{getStatus(row.state)}</TableCell>
                    {/* <TableCell align="right">{row.fat}</TableCell>
           <TableCell align="right">{row.carbs}</TableCell>
           <TableCell align="right">{row.protein}</TableCell> */}
                  </TableRow>
                )
              )}
          </TableBody>

        </Table>
        { rows.length > 0 && (!isDashboard &&  <TablePagination
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
      {/* {purchaseOrders && (
        <DataGrid
          rows={rowsDataGrid}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          // pageSizeOptions={[5, 10, 25]}
        ></DataGrid>
      )} */}
    </>
  );
};



export default PoTable;
