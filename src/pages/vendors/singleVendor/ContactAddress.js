import {
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormControlLabel,
  Link,
  Radio,
  RadioGroup,
  Slide,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Contact from "./ContactAddressTypes/Contact";
import DeliveryAddress from "./ContactAddressTypes/DeliveryAddress";
import InvoiceAddress from "./ContactAddressTypes/InvoiceAddress";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ContactAddress = (props) => {
  const {
    data,
    setData,
    handleChange,
    titles,
    states,
    countries,
    handleClickOpen,
    open,
    handleClose,
  } = props;
  const [myType, setType] = useState("contact");
  const [childDataSave, setChildDataSave] = useState(false);
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const [childData, setChildData] = useState(null);

  const handleChildChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setChildData({
        ...childData,
        [name]: e.target.files[0],
        type: myType,
        parent_id: "False",
      });
    } else if (type === "select-one") {
      setChildData({
        ...childData,
        [name]: parseInt(value),
        type: myType,
        parent_id: "False",
      });
    } else {
      setChildData({
        ...childData,
        [name]: type === "number" ? parseInt(value) : value,
        type: myType,
        parent_id: "False",
      });
    }
  };

  let sumbit_child_data = {};
  useEffect(() => {
    if (childData != null) {
      if (childData?.title === 0) {
        const { title, ...rest } = childData;
        sumbit_child_data = rest;
      }

      setData({
        ...data,
        child_ids:
          Object.keys(sumbit_child_data).length !== 0
            ? [[0, "virtual_104", { ...sumbit_child_data }]]
            : [[0, "virtual_104", { ...childData }]],
      });
    }
  }, [childData]);

  const handleSaveChildData = () => {
    setChildDataSave(true);
    handleClose();
  };
  const handleCloseChildData = () => {
    setChildData(null);
    handleClose();
  };

  console.log(data);

  return (
    <div>
      {" "}
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth={"md"}
      >
        <DialogTitle
          color="secondary"
          style={{ textTransform: "uppercase", fontWeight: "600" }}
        >
          {"Contacts"}
        </DialogTitle>
        <DialogContent>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={myType}
              onChange={handleTypeChange}
            >
              <FormControlLabel
                value="contact"
                control={<Radio />}
                label="Contact"
              />
              <FormControlLabel
                value="invoice"
                control={<Radio />}
                label="Invoice Address"
              />
              <FormControlLabel
                value="delivery"
                control={<Radio />}
                label="Delivery Address"
              />
            </RadioGroup>
          </FormControl>
          {(() => {
            switch (myType) {
              case "contact":
                return (
                  <Contact
                    handleChange={handleChange}
                    setData={setData}
                    data={data}
                    handleChildChange={handleChildChange}
                    titles={titles}
                    childData={childData}
                  />
                );
              case "invoice":
                return (
                  <InvoiceAddress
                    handleChange={handleChange}
                    setData={setData}
                    data={data}
                    handleChildChange={handleChildChange}
                    states={states}
                    countries={countries}
                  />
                );
              case "delivery":
                return (
                  <DeliveryAddress
                    handleChange={handleChange}
                    setData={setData}
                    data={data}
                    handleChildChange={handleChildChange}
                  />
                );
              default:
                return null;
            }
          })()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChildData} variant="outlined">
            Discard
          </Button>
          <Button
            onClick={handleSaveChildData}
            variant="contained"
            color="secondary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <div className="mt-4">
        {childDataSave === true && data?.child_ids?.length > 0 ? (
          <>
            <Card sx={{ maxWidth: 275 }} variant="outlined" onDoubleClick={handleClickOpen}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  variant="h6"
                  gutterBottom
                  style={{ color: "#9c27b0", fontWeight: "500" }}
                >
                  {data?.child_ids?.[0]?.[2]?.name}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {data?.child_ids?.[0]?.[2]?.function}
                </Typography>
                <Typography sx={{ mb: 1.5 }} variant="subtitle2" gutterBottom>
                  <Link href="#" underline="none">
                    {data?.child_ids?.[0]?.[2]?.email}
                  </Link>
                </Typography>
                <Typography variant="body2">
                  Phone: {data?.child_ids?.[0]?.[2]?.phone}
                </Typography>
                <Typography variant="body2">
                  Mobile: {data?.child_ids?.[0]?.[2]?.mobile}
                </Typography>
              </CardContent>
            </Card>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ContactAddress;
