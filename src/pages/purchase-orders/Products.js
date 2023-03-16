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

const Products = ({ data, total }) => {
  const rows = data
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
                backgroundColor: "#323130",
              },
            }}
          >
            <TableRow 
            
            >
              {/* <TableCell  > <b style={{color:"white"}}> Product </b></TableCell> */}
              <TableCell align="left">
                {" "}
                <b style={{ color: "white" }}>Description </b>{" "}
              </TableCell>
              <TableCell align="center">
                {" "}
                <b style={{ color: "white" }}> Date Req. </b>{" "}
              </TableCell>
              {/* <TableCell align="center"> <b style={{color:"white"}}> Tasks </b> </TableCell> */}
              <TableCell align="center">
                {" "}
                <b style={{ color: "white" }}> Quantity </b>{" "}
              </TableCell>
              <TableCell align="center">
                {" "}
                <b style={{ color: "white" }}> UoM </b>{" "}
              </TableCell>
              <TableCell align="center">
                {" "}
                <b style={{ color: "white" }}> Unit&nbsp;Price </b>{" "}
              </TableCell>
              <TableCell align="center">
                {" "}
                <b style={{ color: "white" }}> Taxes </b>{" "}
              </TableCell>
              <TableCell align="center">
                {" "}
                <b style={{ color: "white" }}> Subtotal </b>{" "}
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
                {/* <TableCell component="th" scope="row">
                {row?.display_name}
              </TableCell> */}
                <TableCell align="left">{row?.display_name}</TableCell>
                <TableCell align="center">{row?.date_planned}</TableCell>
                {/* <TableCell align="center">{row.task_id}</TableCell> */}
                <TableCell align="center">{row?.product_qty}</TableCell>
                <TableCell align="center">{row?.product_uom}</TableCell>
                <TableCell align="center">{row?.price_unit}</TableCell>
                <TableCell align="center">{row?.tax_name}</TableCell>
                <TableCell align="center">$ {row?.price_subtotal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
            { total?.groups_by_subtotal["Untaxed Amount"] ? total?.groups_by_subtotal?.["Untaxed Amount"]?.map((e) => {
             return( <tr>
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
