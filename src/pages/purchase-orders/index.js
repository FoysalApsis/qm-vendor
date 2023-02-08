import React, { useCallback, useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PageLayout from '../../components/layout/pageLayout';
import PageHeader from '../../components/layout/pageHeader';
import serverAPI from '../../config/serverAPI';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const MyPurchaseOrder = () => {
    const [purchaseOrders, setPurchaseOrders] = useState([{}]);

    const rows = [
        ...purchaseOrders
     ];

    const navigate = useNavigate()

    const navigator = (id)=>{
      navigate(`/my-purchase-order/${id}`)
    }

  const getMyPO = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem('userObj'))
    const body = { jsonrpc: "2.0", params: {id:user.id} };
    await serverAPI
    .post(`get-my-po`, body)
    .then((res) => {
        setPurchaseOrders(
            res?.data?.response.map((elm) => {
              console.log("elmmmmm",elm[0]);
                return { id: elm[0].id, display_name: elm[0].display_name, company_id:elm[0].company_id[1],partner_id:elm[0].partner_id[1] , date_order:elm[0].date_order , amount_total:elm[0].tax_totals.formatted_amount_total,state:elm[0].state };
            })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const getStatus = (status)=>{
    if(status === 'cancel'){
      return (
        <span style={{color:"red"}}>Cancelled</span>
      )
    }else {
      return (

        <span style={{color:"green"}}>Confirmed</span>
      )
    }
  }

  useEffect(()=>{
    getMyPO()
  },[])
  return (
    <div className='main-container'>
        <PageLayout/>
        <PageHeader title={'Purchase Orders'} >  
            
          </PageHeader>
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{
            "&.MuiTableHead-root":{
                backgroundColor:'#6c227c'
            },
            
        }}>
          <TableRow sx={{
            "&.MuiTableRow-root":{
                color:'white'
            }
          }} >
            <TableCell  > <b style={{color:"white"}}> Reference </b></TableCell>
            <TableCell align='center' > <b style={{color:"white"}}> Vendor </b></TableCell>
            <TableCell align="center"><b style={{color:"white"}}> Company </b></TableCell>
            <TableCell align='center'> <b style={{color:"white"}}> Order Deadline </b></TableCell>
            <TableCell align='center'> <b style={{color:"white"}}> Total </b></TableCell>
            <TableCell align='center'> <b style={{color:"white"}}> Status </b></TableCell>
            {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            onClick={()=> navigator(row.id)}
            >
              <TableCell component="th" scope="row">
                {row.display_name}
              </TableCell>
              <TableCell align="center">{row.partner_id}</TableCell>
              <TableCell align="center">{row.company_id}</TableCell>
              <TableCell align="center">{row.date_order}</TableCell>
              <TableCell align="center">{row.amount_total}</TableCell>
              {/* <TableCell align="center">{row.state === 'cancel' ? "Cancelled" : "Confirmed"}</TableCell> */}
              <TableCell align="center">{getStatus(row.state)}</TableCell>
              {/* <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default MyPurchaseOrder
