import {
  Box,
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
import AddIcon from '@mui/icons-material/Add';
import { toast, ToastContainer } from "react-toastify";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
var cardStyle = {
  display: "block",
  width: "30vw",
  transitionDuration: "0.3s",
  fontWeight: "600",
  textTransform: "capitalize",
};
const ContactAddress = (props) => {
  const {
    data,
    setData,
    handleChange,
    titles,
    states,
    countries,
    childs,
    handleClickOpen,
    open,
    handleClose,
    childEmail,
    setChildEmail,
    childListDatas,
    setChildListData,
    oldChildListDatas,
    setOldChildListDatas,
  } = props;
  const [childDataSave, setChildDataSave] = useState(false);
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  
  const [childData, setChildData] = useState(null);
  const [myType, setType] = useState("contact");
  const [isEmailValid, setEmailValid] = useState(false);

  // useEffect(() => {
  //   data?.child_ids?.forEach((e) => {

  //     if (e[0] === 0) {
  //       console.log(e[2],childEmail.includes(e[2].email));
  //       if (!childEmail.includes(e[2].email)) {
  //         setChildEmail((prev) => [...prev, e[2].email]);
  //         setChildListData((prev) => [...prev, { ...e[2] }]);
  //       }
  //     }
  //   });
  // }, [childListDatas]);

  const handleChildChange = (e) => {
    const { name, value, type } = e.target;

    console.log(name,value);

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(e.target.value)) {
        setEmailValid(true);
      }
    }

    if (type === "file") {
      setChildData({
        ...childData,
        [name]: e.target.files[0],
        type: myType,
        parent_id: "False",
        // id:Date.now()
      });
    } else if (type === "select-one") {
      setChildData({
        ...childData,
        [name]: parseInt(value),
        type: myType,
        parent_id: "False",
        // id:Date.now()
      });
    } else {
      setChildData({
        ...childData,
        [name]: type === "number" ? parseInt(value) : value,
        type: myType,
        parent_id: "False",
        // id:Date.now()
      });
    }
  };

  useEffect(() => {
    if (childs?.length > 0) {
      setChildDataSave(true);
      setOldChildListDatas(childs);
    }
  }, [childs]);

  useEffect(() => {
    if (childListDatas.length > 0 || oldChildListDatas.length > 0) {
      let ids = childListDatas?.map((item) => {
        // delete item['id']
        return [0, "virtual_104", item];
      });
      let oldIds = oldChildListDatas?.map((item) => {
        // delete item['id']
        return [1, item.id, item];
      });
      setData({
        ...data,
        child_ids: [...ids, ...oldIds],
      });
    }
  }, [childListDatas, oldChildListDatas]);

  const handleAdd = () => {
    setChildDataSave(true);
    if (childData && childData.email) {
      if (childData.id) {
        let newArr = childListDatas.filter((e, index) => e.id !== childData.id);
        let oldArr = oldChildListDatas.filter(
          (e, index) => e.id !== childData.id
        );
        if (newArr.length === childListDatas.length) {
          setOldChildListDatas([childData, ...oldArr]);
        } else {
          // setChildEmail((prev)=>[...prev,childData.email])
          setChildListData([...newArr, childData]);
        }

        handleClose();
        setChildData(null);
      } else {
        //        setChildData((prev)=>{return {...prev,id: Date.now()}})
        let dateId = Date.now();
        // setChildEmail((prev)=>[...prev,childData.email])
        setChildListData((prev) => [...prev, { ...childData, id: dateId }]);
        handleClose();
        setChildData(null);
      }
    } else {
      toast.error("Email Cannot be Empty", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleCloseChildData = () => {
    setChildData(null);
    handleClose();
  };
console.log(childData,"<====childData");
  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />{" "}
      <Button variant="contained" startIcon={<AddIcon/>} onClick={handleClickOpen}  className="!bg-[#ffffff] !text-primaryColor border !capitalize !border-primaryColor">
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
                    childData={childData}
                  />
                );
              case "delivery":
                return (
                  <DeliveryAddress
                    handleChange={handleChange}
                    setData={setData}
                    data={data}
                    handleChildChange={handleChildChange}
                    states={states}
                    countries={countries}
                    childData={childData}
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
          <Button onClick={handleAdd} variant="contained" color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <div className="mt-4">
        <div className="row">
          {childDataSave === true &&
          oldChildListDatas?.length > 0 &&
          Object.entries(oldChildListDatas[0]).length > 0
            ? oldChildListDatas?.map((item) => (
                <>
                  <div className="col-6 border-0 p-0 " >
                    <Card
                      sx={{ width: "auto" }}
                      variant="outlined"
                      onDoubleClick={() => {
                        setChildData(item);
                        setType(item?.type);
                        handleClickOpen();
                      }}
                      className="!bg-greyColor"
                    >
                      <CardContent className="flex items-center">
                        <Box className="me-3">
                        <Typography>
                          {item?.type === "contact" && <PersonOutlineOutlinedIcon className="!text-primaryColor"/>}
                          {item?.type === "delivery" && <LocalShippingOutlinedIcon className="!text-primaryColor"/>}
                          {item?.type === "invoice" && <LocalAtmOutlinedIcon className="!text-primaryColor"/>}
                        </Typography>

                        </Box>
                        <Box>

                        
                        <Typography
                          sx={{ fontSize: 14 }}
                          variant="body1"
                          gutterBottom
                          style={{ fontWeight: "500" }}
                          className="!text-secondaryColor segoe-bold"
                        >
                          {item?.name}
                        </Typography>
                        {/* <Typography
                          variant="body2"
                          gutterBottom
                          style={{ fontStyle: "italic" }}
                        >
                          {item?.function}
                        </Typography> */}
                        <Typography variant="body2" gutterBottom>
                          <Link href="#" underline="none" className="!text-[#605E5C]">
                            {item?.email}
                          </Link>
                        </Typography>
                        {/* <Typography variant="body2" style={cardStyle}>
                          {item?.type}
                        </Typography> */}
                        {/* <Typography variant="body2">
                          Phone: {item?.phone}
                        </Typography>
                        <Typography variant="body2">
                          Mobile: {item?.mobile}
                        </Typography> */}
                        </Box>
                      </CardContent>
                    </Card>
                  </div>
                </>
              ))
            : ""}
          {childDataSave === true && childListDatas?.length > 0
            ? childListDatas?.map((item) => (
                <>
                  <div className="col-6 border-0 p-0" >
                    <Card
                      sx={{ width: "auto", }}
                      variant="outlined"
                      onDoubleClick={() => {
                        setChildData(item);
                        setType(item?.type);
                        handleClickOpen();
                      }}
                      className="!bg-greyColor"
                    >
                      <CardContent className="flex items-center">
                      <Box className="me-3">

                      <Typography>
                          {item?.type === "contact" && <PersonOutlineOutlinedIcon className="!text-primaryColor"/>}
                          {item?.type === "delivery" && <LocalShippingOutlinedIcon className="!text-primaryColor"/>}
                          {item?.type === "invoice" && <LocalAtmOutlinedIcon className="!text-primaryColor"/>}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontSize: 14 }}
                          variant="body1"
                          gutterBottom
                          style={{ color: "#9c27b0", fontWeight: "500" }}
                          className="!text-secondaryColor segoe-bold"
                        >
                          {item?.name}
                        </Typography>
                        {/* <Typography
                          variant="body2"
                          gutterBottom
                          style={{ fontStyle: "italic" }}
                        >
                          {item?.function}
                        </Typography> */}
                        <Typography variant="body2" gutterBottom>
                          <Link href="#" underline="none" className="!text-[#605E5C]">
                            {item?.email}
                          </Link>
                        </Typography>
                        {/* <Typography variant="body2" style={cardStyle}>
                          {item?.type}
                        </Typography> */}
                        {/* <Typography variant="body2">
                          Phone: {item?.phone}
                        </Typography>
                        <Typography variant="body2">
                          Mobile: {item?.mobile}
                        </Typography> */}
                        </Box>
                      </CardContent>
                    </Card>
                  </div>
                </>
              ))
            : ""}
          {/* {childDataSave === true && childListDatas?.length > 0
            ? data?.child_ids?.filter((e)=>e[1]==="virtual_104").map((item) => (

                <>
                
                  <div className="col-3 mt-2" style={{ maxWidth: "260px" }}>
                    <Card
                      sx={{ width: "auto", maxWidth: "260px" }}
                      variant="outlined"
                      onDoubleClick={() => {
                        setChildData(item);
                        handleClickOpen();
                      }}
                    >
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          variant="body1"
                          gutterBottom
                          style={{ color: "#9c27b0", fontWeight: "500" }}
                        >
                          {item[2]?.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          style={{ fontStyle: "italic" }}
                        >
                          {item[2]?.function}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <Link href="#" underline="none">
                            {item[2]?.email}
                          </Link>
                        </Typography>
                        <Typography variant="body2" style={cardStyle}>
                          {item[2]?.type}
                        </Typography>
                        <Typography variant="body2">
                          Phone: {item[2]?.phone}
                        </Typography>
                        <Typography variant="body2">
                          Mobile: {item[2]?.mobile}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                </>

              ))
            : ""} */}
        </div>
      </div>
    </div>
  );
};

export default ContactAddress;
