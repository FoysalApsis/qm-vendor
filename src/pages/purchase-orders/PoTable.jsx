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
// var numbro = require("numbro");
import numbro from "numbro";
import {
  TablePagination,
} from "@mui/material";
// import TablePagination from "@material-ui/core/TablePagination";
import MoreVertIcon from '@mui/icons-material/MoreVert';


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
              currency_id:elm[0].currency_id
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
                  color: "white",
                },
              }}
            >
              <TableCell>
                {" "}
                <b style={{ color: "white" }}> PO Number </b>
              </TableCell>
              <TableCell  >
                {" "}
                <b style={{ color: "white" }}> Vendor </b>
              </TableCell>
              <TableCell  >
                <b style={{ color: "white" }}> Order From </b>
              </TableCell>
              <TableCell  >
                {" "}
                <b style={{ color: "white" }}> Order Deadline </b>
              </TableCell>
              <TableCell  >
                {" "}
                <b style={{ color: "white" }}> Total Amount </b>
              </TableCell>
              <TableCell  >
                {" "}
                <b style={{ color: "white" }}> Currency </b>
              </TableCell>
              <TableCell  >
                {" "}
                <b style={{ color: "white" }}> Status </b>
              </TableCell>
              
            </TableRow>
          </TableHead>  */}
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

                <b className="text-[13px]" style={{ color: "#5F6D7E" }}> PO Number </b>
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
                <b className="text-[13px]" style={{ color: "#5F6D7E" }}>  Order From </b>
                <MoreVertIcon fontSize="small" sx={{color:"#5F6D7E"}}></MoreVertIcon>
              </div>
            </TableCell>
            <TableCell   sx={{borderRight:'1px solid white'}}>
              <div className="flex justify-between items-center">
                <b className="text-[13px]" style={{ color: "#5F6D7E" }}> Order Deadline </b>
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
            <TableCell   >
              <div className="flex justify-between items-center">
                <b className="text-[13px]" style={{ color: "#5F6D7E" }}> Status </b>
                <MoreVertIcon fontSize="small" sx={{color:"#5F6D7E"}}></MoreVertIcon>
              </div>
            </TableCell>
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
                      <TableCell  >{row.partner_id}</TableCell>
                      <TableCell  >{row.company_id}</TableCell>
                      <TableCell  >
                        {row?.date_order?.split(" ")[0]}
                      </TableCell>
                      <TableCell  >{numbro(row?.amount_total).format({thousandSeparated:true,mantissa:2})}</TableCell>
                      {/* <TableCell  >{row.state === 'cancel' ? "Cancelled" : "Confirmed"}</TableCell> */}
                      <TableCell  >
                        {row?.currency_id?.[1]}
                      </TableCell>
                      <TableCell  >
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
                    <TableCell  >{row.partner_id}</TableCell>
                    <TableCell  >{row.company_id}</TableCell>
                    <TableCell  >
                      {row?.date_order?.split(" ")[0]}
                    </TableCell>
                    {/* <TableCell  >{row?.amount_total?.toFixed(2)}</TableCell> */}
                    <TableCell  >{numbro(row?.amount_total).format({thousandSeparated:true,mantissa:2})}</TableCell>
                    <TableCell  >
                        {row?.currency_id?.[1]}
                      </TableCell>
                    {/* <TableCell  >{row.state === 'cancel' ? "Cancelled" : "Confirmed"}</TableCell> */}
                    <TableCell  >{getStatus(row.state)}</TableCell>
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
