import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import minus from "../../../images/minus.png";
import add from "../../../images/add.png";


const Accounting = (props) => {
  const { data, setData, handleChange, banks } = props;
  const [values, setValues] = useState([[0,"virtual_822",{ bank_id: "", acc_number: "" }]]);
  const [index, setIndex] = useState(null);

  const handleAddClick = () => {
    setValues([...values, [0,"virtual_822",{ bank_id: "", acc_number: "" }]]);
  };

  const handleRemoveClick = (index) => {
    const list = [...values];
    list.splice(index, 1);
    setValues(list);
  };

  const handleInputChange = (e, index) => {
    const { name, type } = e.target;
    setIndex(index);
    const list = [...values];
    // console.log(list);
    list[index][2][name] =
      type === "select-one" ? parseInt(e.target.value) : e.target.value;
    setValues(list);
  };

  useEffect(() => {
    if (values[0]["bank_id"] !== "" || values[0]["acc_number"] != "") {
      setData({
        ...data,
        bank_ids: values,
      });
    }
  }, [values]);


  return (
    <>
      {values?.map((e, index) => {
        return (
          <div key={index} className="mb-2">
            <div className="row">
              <div className="col-2">
                {" "}
                <select
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
                </select>
              </div>
              <div className="col-10">
                {" "}
                <TextField
                  id="standard-basic"
                  label="Account Number"
                  name="acc_number"
                  variant="outlined"
                  color="secondary"
                  style={{ width: "30%" }}
                  size={"small"}
                  onChange={(e) => handleInputChange(e, index)}
                />
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
