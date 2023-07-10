import React, { useContext } from "react";
import { Menu, MenuItem, Box } from "@mui/material";
import AuthContext from "../../../context/authContext/AuthContext";
import LogoutIcon from "../../../images/logout.png";
import LockResetIcon from '@mui/icons-material/LockReset';
import ChangePassword from "./ChangePassword";

const DropDown = ({ children }) => {
  const authContext = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);

  const { Logout } = authContext;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const dropDownOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={dropDownOpen ? "true" : undefined}
        onClick={handleClick}
        sx={{ cursor: "pointer", fontSize: 14 }}
        variant="contained"
        className="text-capitalize d-inline dark font-light"
      >
        {children}
      </Box>
      <ChangePassword open={open} onClose={handleCloseDialog} setOpen={setOpen}></ChangePassword>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={dropDownOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: "#f19fff",
            paddingTop: 0,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 60,
              width: 10,
              height: 10,
              backgroundColor: "#f19fff",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        <MenuItem
        className="dark"
        onClick={()=>setOpen(true)}
        sx={{
          cursor: "pointer",
          fontSize: 14,
          padding: "1px 8px",
          color: "#828282",
          backgroundColor: "#f19fff",
          "&:hover": {
            backgroundColor: "#9c27b0",
            color: "white"
          },
        }}>
          <LockResetIcon style={{color:"black", marginRight:"8px"}}></LockResetIcon>
          Change Password
        </MenuItem>
        <MenuItem
          className="dark"
          sx={{
            cursor: "pointer",
            fontSize: 14,
            padding: "1px 8px",
            color: "#828282",
            backgroundColor: "#f19fff",
            "&:hover": {
              backgroundColor: "#9c27b0",
              color: "white"
            },
          }}
          onClick={Logout}
        >
          <img src={LogoutIcon} alt="logout" height="25" width="25" />
          &nbsp; Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default DropDown;
