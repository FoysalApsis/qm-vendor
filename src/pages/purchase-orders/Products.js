import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'

const Products = ({data}) => {

    const rows = data
    let total = 0 
    data?.map((e)=>{
        console.log(e.price_subtotal);
        total = total + e.price_subtotal
        console.log(total);
    })
  return (
    <div >
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead  sx={{
            "&.MuiTableHead-root":{
                backgroundColor:'#6c227c'
            },
            
        }} >
          <TableRow >
            {/* <TableCell  > <b style={{color:"white"}}> Product </b></TableCell> */}
            <TableCell align="left"> <b style={{color:"white"}}>Description </b> </TableCell>
            <TableCell align="center"> <b style={{color:"white"}}> Date Req. </b> </TableCell>
            {/* <TableCell align="center"> <b style={{color:"white"}}> Tasks </b> </TableCell> */}
            <TableCell align="center"> <b style={{color:"white"}}> Quantity </b> </TableCell>
            <TableCell align="center"> <b style={{color:"white"}}> Unit&nbsp;Price </b> </TableCell>
            <TableCell align="center"> <b style={{color:"white"}}> Taxes </b> </TableCell>
            <TableCell align="center"> <b style={{color:"white"}}> Subtotal </b> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row?.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row">
                {row?.display_name}
              </TableCell> */}
              <TableCell align="left">{row.display_name}</TableCell>
              <TableCell align="center">{row.date_planned}</TableCell>
              {/* <TableCell align="center">{row.task_id}</TableCell> */}
              <TableCell align="center">{row.product_qty}</TableCell>
              <TableCell align="center">{row.price_unit}</TableCell>
              <TableCell align="center">{row.taxes_id}</TableCell>
              <TableCell align="center">{row.price_subtotal}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div className='mt-2 me-4' style={{textAlign:"end"}}>
       Total: {total}
    </div>
    </div>
  )
}

export default Products
