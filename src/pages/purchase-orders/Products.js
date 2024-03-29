import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { width } from "@mui/system"
import { ClientConfigurationError } from "msal"
import React, { useEffect, useState } from "react"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from "moment";
import DatagridTable from "../../vendorComponents/table/DatagridTable";


const Products = ({ data, total }) => {
  const rows = data

  const columns = [
    {
      field: "display_name",
      headerName: "Description",
      width: 150,
      type:'date',
     
    },
    {
      field: "date_planned",
      headerName: "Date Req.",
      width: 200,
      valueGetter: (params) =>
      moment(params.row?.date_planned).format("YYYY-MM-DD"),
    },
    {
      field: "product_qty",
      headerName: "Quantity",
      width: 200,
    },
    {
      field: "product_uom",
      headerName: "UoM",
      type: 'number',
      width: 150,
      valueGetter: (params) => params.row?.product_uom?.[1],
    },
    {
      field: "price_unit",
      headerName: "Unit Price",
      type: 'number',
      width: 150,
    },
    {
      field: "tax_name",
      headerName: "Taxes",
      type: 'number',
      width: 150,
    },
    {
      field: "price_subtotal",
      headerName: "Subtotal",
      width: 350,
     
    },
  ];
  // let total = 0
  // data?.map((e)=>{
  //     total = total + e.price_subtotal
  // })
  // useEffect(()=>{
  //   setTax(rows?.map((e)=>{
  //     if(e.price_tax != 0 ){
  //       return e.price_tax
  //     }
  //     else return e.price_tax
  //   }))
  // },[])

  // console.log(total.groups_by_subtotal['Untaxed Amount'][0].tax_group_amount);
  // console.log(tax);
  return (
    <div>
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
              <TableCell sx={{ borderRight: '1px solid white' }}>
                <div className="flex justify-between items-center">

                  <b className="text-[13px]" style={{ color: "#5F6D7E" }}> Description </b>
                  <MoreVertIcon fontSize="small" sx={{ color: "#5F6D7E" }}></MoreVertIcon>
                </div>
              </TableCell>
              <TableCell   sx={{ borderRight: '1px solid white' }}>
                <div className="flex justify-between items-center">

                  <b className="text-[13px]" style={{ color: "#5F6D7E" }}> Date Req. </b>
                  <MoreVertIcon fontSize="small" sx={{ color: "#5F6D7E" }}></MoreVertIcon>
                </div>
              </TableCell>
              <TableCell   sx={{ borderRight: '1px solid white' }}>
                <div className="flex justify-between items-center">
                  <b className="text-[13px]" style={{ color: "#5F6D7E" }}> Quantity </b>
                  <MoreVertIcon fontSize="small" sx={{ color: "#5F6D7E" }}></MoreVertIcon>
                </div>
              </TableCell>
              <TableCell   sx={{ borderRight: '1px solid white' }}>
                <div className="flex justify-between items-center">
                  <b className="text-[13px]" style={{ color: "#5F6D7E" }}> UoM </b>
                  <MoreVertIcon fontSize="small" sx={{ color: "#5F6D7E" }}></MoreVertIcon>
                </div>
              </TableCell>
              <TableCell   sx={{ borderRight: '1px solid white' }}>
                <div className="flex justify-between items-center">
                  <b className="text-[13px]" style={{ color: "#5F6D7E" }}> Unit&nbsp;Price </b>
                  <MoreVertIcon fontSize="small" sx={{ color: "#5F6D7E" }}></MoreVertIcon>
                </div>
              </TableCell>
              <TableCell   sx={{ borderRight: '1px solid white' }}>
                <div className="flex justify-between items-center">


                  <b className="text-[13px]" style={{ color: "#5F6D7E" }}> Taxes </b>
                  <MoreVertIcon fontSize="small" sx={{ color: "#5F6D7E" }}></MoreVertIcon>
                </div>
              </TableCell>
              <TableCell   >
                <div className="flex justify-between items-center">
                  <b className="text-[13px]" style={{ color: "#5F6D7E" }}> Subtotal </b>
                  <MoreVertIcon fontSize="small" sx={{ color: "#5F6D7E" }}></MoreVertIcon>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow
                key={row?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className="bg-[#F8F8F8]"

              >
                
                <TableCell align="left">{row?.display_name}</TableCell>
                <TableCell  >{moment(row?.date_planned).format("YYYY-MM-DD")}</TableCell>
                
                <TableCell  >{row?.product_qty}</TableCell>
                <TableCell  >{row?.product_uom?.[1]}</TableCell>
                <TableCell  >{row?.price_unit}</TableCell>
                <TableCell  >{row?.tax_name}</TableCell>
                <TableCell  >$ {row?.price_subtotal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <DatagridTable columns={columns} data={rows}></DatagridTable> */}

      <div
        className="mt-2 me-4 d-flex justify-content-end"
        style={{ textAlign: "end" }}
      >
        {/* <div className='text-end'>Untaxed Amount: {total.formatted_amount_untaxed} </div>
      <div className='text-end'>Total:$ {total.groups_by_subtotal['Untaxed Amount'][0].tax_group_amount} </div>
      <div className='text-end'>Total: {total.formatted_amount_total} </div> */}
        {total && (
          <table style={{ width: "250px" }} className="bg-[#F8F8F8]">
            <tr>
              <td>Untaxed Amount:</td>
              <td> {total?.formatted_amount_untaxed}</td>
            </tr>
            {total?.groups_by_subtotal["Untaxed Amount"] ? total?.groups_by_subtotal?.["Untaxed Amount"]?.map((e) => {
              return (<tr>
                <td>{e?.tax_group_name}:</td>
                <td>
                  ${" "}
                  {total?.groups_by_subtotal["Untaxed Amount"]
                    ? e?.tax_group_amount
                    : ""}
                </td>
              </tr>)
            }) : ""}
            <tr style={{ borderTop: "1px solid black" }} >
              <td>Total: </td>
              <td>{total?.formatted_amount_total}</td>
            </tr>
          </table>
        )}
      </div>
    </div>
  )
}

export default Products
