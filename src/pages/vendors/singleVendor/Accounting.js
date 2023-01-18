import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import minus from "../../../images/minus.png";
import add from "../../../images/add.png";

const Accounting = (props) => {
  const { data, setData, handleChange } = props;
  const [values, setValues] = useState([{ bank_id: "", acc_number: "" }]);
  const [index,setIndex] = useState(null)

  const handleAddClick = () => {
    setValues([...values, { bank_id: "", acc_number: "" }]);
  };

  const handleRemoveClick = (index) => {
    const list = [...values];
    list.splice(index, 1);
    setValues(list);
  };

  const handleInputChange = (e,index) => {
    const {name} = e.target;
    setIndex(index);
    const list = [...values];
    list[index][name] = e.target.value;
    setValues(list);
  };

  useEffect(()=>{
    if (values[0]['bank_id']!=="" || values[0]['acc_number']!="") {
        setData({
            ...data,
            bank_ids:values
        })
    }
 
  },[values])

  return (
    <>
      {values?.map((e, index) => {
        return (
          <div key={index} className="mb-2">
            <TextField
              id="standard-basic"
              label="Bank Name"
              variant="outlined"
              color="secondary"
              name="bank_id"
              style={{ marginRight: "10px", width:"30%"}}
              size={"small"}
              onChange={(e)=>handleInputChange(e,index)}
            />
            <TextField
              id="standard-basic"
              label="Account Number"
              name="acc_number"
              variant="outlined"
              color="secondary"
              style={{width:"30%"}}
              size={"small"}
              onChange={(e)=>handleInputChange(e,index)}
            />
            <img
              src={add}
              alt="add"
              style={{ width: "25px", marginTop: "5px", marginLeft: "1rem", cursor:"pointer" }}
              onClick={handleAddClick}
              data-toggle="tooltip" data-placement="bottom" title="Add"
            />
            {index > 0 ? (
              <img
                src={minus}
                alt="minus"
                style={{ width: "25px", marginTop: "5px", marginLeft: "1rem", cursor:"pointer" }}
                onClick={() => handleRemoveClick(index)}
                data-toggle="tooltip" data-placement="bottom" title="Remove"
              />
            ) : (
              ""
            )}
          </div>
        );
      })}
    </>
  );
};

export default Accounting;
