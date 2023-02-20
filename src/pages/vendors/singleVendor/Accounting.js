import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import minus from "../../../images/minus.png";
import add from "../../../images/add.png";
import { Input } from "@mui/material";

// const regex = /^[0-9\b]+$/;
const Accounting = (props) => {
  const user = JSON.parse(localStorage.getItem("userObj"));
  const { data, setData, handleChange, banks } = props;
  const [values, setValues] = useState([{ bank_name: user?.bank_name, acc_number: user?.acc_no ,bank_ic:user?.bank_ic,transit_no:user?.transit_no}]);
  const [index, setIndex] = useState(null);


  const handleAddClick = () => {
    setValues([...values, { bank_name: "", acc_number: "" ,bank_ic:"",transit_no:""}]);
  };
  const handleRemoveClick = (index) => {
    const list = [...values];
    list.splice(index, 1);
    setValues(list);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
      setIndex(index);
      let newArray = values?.map((item,itemIndex) => index ===itemIndex ? {...item,[name]:value}: item  ) 
      setValues(newArray)
    // newArray = newArray.map((e)=>{
    //   return {
    //     "bank_info":e.bank_name + e.bank_ic + e.transit_no,
    //     "acc_number":e.acc_number
    //   }
    // })
    // console.log(newArray);
    // const list = [...values];
    // // console.log(list);
    // list[index][2][name] =
    //   type === "select-one" ? parseInt(e.target.value) : e.target.value;
    // setValues(list);
  };

  const numberTypeHandler =(e,index)=> {
    const { name, value } = e.target;
    let newValue = value?.split("").filter(Number).join("")
    setIndex(index);
    let newArray = values?.map((item,itemIndex) => index ===itemIndex ? {...item,[name]:newValue}: item  ) 
    setValues(newArray)
  }
  useEffect(() => {
    if (values[0]["bank_name"] !== "" || values[0]["acc_number"] != "" || values[0]["bank_ic"] !== "" || values[0]["transit_no"] !== "") {
      let newArr = values.map((e)=>{
        return {
              "bank_name":e.bank_name,
              "bank_ic":e.bank_ic,
              "transit_no":e.transit_no,
              "acc_no":e.acc_number
            }
      })
      setData({
        ...data,
        bank_name: newArr[0]['bank_name'],
        bank_ic: newArr[0]['bank_ic'],
        transit_no: newArr[0]['transit_no'],
        acc_no: newArr[0]['acc_no'],
      });
    }
  }, [values]);


  return (
    <>
      {values?.map((item, index) => {
        return (
          <div key={index} className="mb-2">
            <div className="row" style={{maxWidth:"778px"}}>
              

              <div className=" col-3 mt-3 text-end">
                <label htmlFor="">Name of the Bank</label>
              </div>
              <div className="col-9 mt-2">
              <input
                  // id="standard-basic"
                  name="bank_name"
                  // variant="outlined"
                  color="secondary"
                  className="form-control"
                  // style={{ width: "30%" }}
                  size={"small"}
                  defaultValue = {user?.bank_name ? user?.bank_name : "" }
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
              <div className=" col-3 mt-3 text-end">
                <label htmlFor="">Bank Identifier Code</label>
              </div>
              <div className="col-9 mt-2">

              <input
               id="standard-basic"
               className="form-control"
               name="bank_ic"
               variant="outlined"
               color="secondary"
               defaultValue={user?.bank_ic ? user.bank_ic:""}

               InputProps={{ inputProps: { minlength: 3, maxlength: 3 } }}
               size={"small"}
               onChange={(e) => numberTypeHandler(e, index)}
              />
              </div>

              <div className=" col-3 mt-3 text-end">
                <label htmlFor="">Transit Number</label>
              </div>
              <div className="col-9 mt-2">

              <input
               id="standard-basic"
               className="form-control"
               name="transit_no"
               variant="outlined"
               color="secondary"
               defaultValue={user?.transit_no ? user.transit_no:""}

               InputProps={{ inputProps: { minlength: 5, maxlength: 5 } }}
               // style={{ width: "30%" }}
               size={"small"}
               onChange={(e) => numberTypeHandler(e, index)}
              />
              </div>
              <div className=" col-3 mt-3 text-end">
                <label htmlFor="">Account Number</label>
              </div>
              <div className="col-9 mt-2">

              <input
              id="standard-basic"
              className="form-control"
              name="acc_number"
              variant="outlined"
              color="secondary"
              defaultValue={user?.acc_no ? user.acc_no:""}
              InputProps={{ inputProps: { minlength: 7, maxlength: 10 } }}
              min="7"
              max="10"
              // style={{ width: "100" }}
              size={"small"}
              onChange={(e) =>{
                numberTypeHandler(e, index)
              }}
              />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Accounting;
