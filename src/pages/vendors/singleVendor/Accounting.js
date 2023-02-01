import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import minus from "../../../images/minus.png";
import add from "../../../images/add.png";


const Accounting = (props) => {
  const { data, setData, handleChange, banks } = props;
  const [values, setValues] = useState([{ bank_name: "", acc_number: "" ,bank_ic:"",transit_no:""}]);
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
    // newArray = newArray.map((e)=>{
    //   return {
    //     "bank_info":e.bank_name + e.bank_ic + e.transit_no,
    //     "acc_number":e.acc_number
    //   }
    // })
    // console.log(newArray);
    setValues(newArray)
    // const list = [...values];
    // // console.log(list);
    // list[index][2][name] =
    //   type === "select-one" ? parseInt(e.target.value) : e.target.value;
    // setValues(list);
  };
  useEffect(() => {
    if (values[0]["bank_name"] !== "" || values[0]["acc_number"] != "" || values[0]["bank_ic"] !== "" || values[0]["transit_no"] !== "") {
      let newArr = values.map((e)=>{
        return {
              "b_info":`${e.bank_name} ${e.bank_ic} ${e.transit_no}`,
              "acc_no":e.acc_number
            }
      })
      // setData({
      //   ...data,
      //   bank_ids: newArr?.map((item)=>{return [0,"virtual_822",item]}),
      // });
      setData({
        ...data,
        b_info: newArr[0]['b_info'],
        acc_no: newArr[0]['acc_no'],
      });
    }
  }, [values]);

  console.log(data,"--------data");

  return (
    <>
      {values?.map((e, index) => {
        return (
          <div key={index} className="mb-2">
            <div className="row">
              <div className="col-3">
                {" "}
                {/* <select
                  id="bank_id"
                  name="bank_id"
                  className="form-control w-100 "
                  placeholder="Bank Name"
                  onChange={(e) => handleInputChange(e, index)}
                  // value={Array.isArray(data?.titles) ? data?.titles[0] : data?.titles}
                >
                  <option value="">Select Bank</option>
                  {banks?.map((item, index) => (
                    <option value={item?.id} key={index}>
                      {item?.label}
                    </option>
                  ))}
                </select> */}
                <TextField
                  id="standard-basic"
                  label="Name of the Bank"
                  name="bank_name"
                  variant="outlined"
                  color="secondary"
                  // style={{ width: "30%" }}
                  size={"small"}
                  onChange={(e) => handleInputChange(e, index)}
                />
                
              
              </div>
              <div className="col-2">
                {" "}
              <TextField
                  id="standard-basic"
                  label="Bank Identifier Code"
                  name="bank_ic"
                  variant="outlined"
                  color="secondary"
                  // style={{ width: "30%" }}
                  size={"small"}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
              <div className="col-2"> 
              {" "}
              <TextField
                  id="standard-basic"
                  label="Transit Number"
                  name="transit_no"
                  variant="outlined"
                  color="secondary"
                  // style={{ width: "30%" }}
                  size={"small"}
                  onChange={(e) => handleInputChange(e, index)}
                />
                
              </div>
              <div className="col-4">
                {" "}

                <TextField
                  id="standard-basic"
                  label="Account Number"
                  name="acc_number"
                  variant="outlined"
                  color="secondary"
                  style={{ width: "70%" }}
                  size={"small"}
                  onChange={(e) => handleInputChange(e, index)}
                />
                {/* <TextField
                  id="standard-basic"
                  label="Account Number"
                  name="acc_number"
                  variant="outlined"
                  color="secondary"
                  // style={{ width: "30%" }}
                  size={"small"}
                  onChange={(e) => handleInputChange(e, index)}
                /> */}
                
                <img
                  src={add}
                  alt="add"
                  style={{
                    width: "25px",
                    marginTop: "5px",
                    marginLeft: "1rem",
                    cursor: "pointer",
                  }}
                  onClick={handleAddClick}
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Add"
                />
                {index ? (
                  <img
                    src={minus}
                    alt="minus"
                    style={{
                      width: "25px",
                      marginTop: "5px",
                      marginLeft: "1rem",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRemoveClick(index)}
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Remove"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Accounting;
