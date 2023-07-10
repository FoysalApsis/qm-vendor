import React, { useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import minus from "../../../images/minus.png";
import add from "../../../images/add.png";
import { Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import serverAPI from "../../../config/serverAPI";

// const regex = /^[0-9\b]+$/;
const Accounting = (props) => {
  const user = JSON.parse(localStorage.getItem("userObj"));
  const { data, setData, handleChange, banks } = props;
  const [values, setValues] = useState([
    {
      bank_name: user?.bank_name,
      acc_number: user?.acc_no,
      bank_ic: user?.bank_ic,
      transit_no: user?.transit_no,
    },
  ]);
  const [index, setIndex] = useState(null);
  const [banksList, setBanksList] = useState(null);


  const getPartnerBank = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("userObj"));
    const body = { jsonrpc: "2.0", params: {"id":user?.id} };
    await serverAPI
      .post(`get-bank-accounts`, body)
      .then((res) => {
        setBanksList(res?.data?.response.map((elm) =>{return{bank_name:elm[2],acc_number:elm[1]}}))
        // setBanks(
        //   res?.data?.response.map((elm) => {
        //     return { id: elm[0].id, label: elm[0].display_name };
        //   })
        // );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // useEffect(() => {
  //   if (
  //     values[0]["bank_name"] !== "" ||
  //     values[0]["acc_number"] != "" ||
  //     values[0]["bank_ic"] !== "" ||
  //     values[0]["transit_no"] !== ""
  //   ) {
  //     let newArr = values.map((e) => {
  //       return {
  //         bank_name: e.bank_name,
  //         bank_ic: e.bank_ic,
  //         transit_no: e.transit_no,
  //         acc_no: e.acc_number,
  //       };
  //     });
  //     setData({
  //       ...data,
  //       bank_name: newArr[0]["bank_name"],
  //       bank_ic: newArr[0]["bank_ic"],
  //       transit_no: newArr[0]["transit_no"],
  //       acc_no: newArr[0]["acc_no"],
  //     });
  //   }
  // }, [values]);

  useEffect(()=>{
    getPartnerBank()
  },[])

  return (
    <>
      {/* {values?.map((item, index) => {
        return (
          <div key={index} className="mb-2 row">
            <div className="row col-6" style={{ maxWidth: "778px" }}>
              <div className=" col-12 mt-3 segoe-bold">
                <label htmlFor="">Name of the Bank</label>
              </div>
              <div className="col-12">
                <input
                  readOnly
                  // id="standard-basic"
                  name="bank_name"
                  // variant="outlined"
                  color="secondary"
                  className="form-control"
                  // style={{ width: "30%" }}
                  size={"small"}
                  defaultValue={user?.bank_name ? user?.bank_name : ""}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
              <div className=" col-12 mt-3 segoe-bold">
                <label htmlFor="">Bank Identifier Code</label>
              </div>
              <div className="col-12">
                <input
                  readOnly
                  id="standard-basic"
                  className="form-control"
                  name="bank_ic"
                  variant="outlined"
                  color="secondary"
                  defaultValue={user?.bank_ic ? user.bank_ic : ""}
                  maxLength={3}
                  InputProps={{ inputProps: { minlength: 3, maxlength: 3 } }}
                  size={"small"}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
            </div>
            <div className="row col-6">
              <div className=" col-12 mt-3 segoe-bold">
                <label htmlFor="">Transit Number</label>
              </div>
              <div className="col-12">
                <input
                  readOnly
                  id="standard-basic"
                  className="form-control"
                  name="transit_no"
                  variant="outlined"
                  color="secondary"
                  defaultValue={user?.transit_no ? user.transit_no : ""}
                  InputProps={{ inputProps: { minlength: 5, maxlength: 5 } }}
                  minLength={5}
                  maxLength={5}
                  // style={{ width: "30%" }}
                  size={"small"}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
              <div className=" col-12 mt-3 segoe-bold">
                <label htmlFor="">Account Number</label>
              </div>
              <div className="col-12">
                <input
                  readOnly
                  id="standard-basic"
                  className="form-control"
                  name="acc_number"
                  variant="outlined"
                  color="secondary"
                  defaultValue={user?.acc_no ? user.acc_no : ""}
                  maxLength={11}
                  minLength={7}
                  // style={{ width: "100" }}
                  size={"small"}
                  onChange={(e) => {
                    handleInputChange(e, index);
                  }}
                />
              </div>
            </div>
          </div>
        );
      })} */}
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
                  color: "#F8F8F8",
                },
              }}
            >
              <TableCell>
                {" "}
                <b style={{ color: "white" }}>Bank Name </b>
              </TableCell>
              <TableCell align="center">
                {" "}
                <b style={{ color: "white" }}> Account Number </b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banksList?.map((row)=>{

              return (

          <TableRow
                // key={row?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                // onClick={() => navigator(row?.id)}
                // style={{backgroundColor:"#F8F8F8"}}
                className="bg-[#F8F8F8]"
              >
                <TableCell component="th" scope="row">
                  {row?.bank_name}
                </TableCell>
                <TableCell align="center">
                  {row?.acc_number}
                </TableCell>
              </TableRow>
              )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Accounting;
