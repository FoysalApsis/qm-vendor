import { List } from "@mui/material";
import React from "react";
import { CustomListItem } from "./Modules";
// import "./SideBar.scss";
import qmlogo from "../../../images/respond.png";

import "./newSideBar.scss";
import {
  AuditIcon,
  DashboardIcon,
  RequestIcon,
  SettingsIcon,
} from "../../../utils/Icons";
import { useContext } from "react";
import AuthContext from "../../../context/authContext/AuthContext";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

const SideBar = ({ handleClick, open }) => {
  const { user } = useContext(AuthContext);
  const reimbursementRequests = [
    {
      path: "/reimbursement-request/create-request",
      title: "- Create New Request",
    },
    {
      path: "/reimbursement-request/open-requests",
      title: "- Open Requests",
    },
    {
      path: "/reimbursement-request/closed-requests",
      title: "- Closed Requests",
    },
    {
      path: "/reimbursement-request/rejected-requests",
      title: "- Rejected Requests",
    },
    {
      path: "/reimbursement-request/requests-sent-for-approval",
      title: "- Requests Sent for Approval",
    },
    {
      path: "/reimbursement-request/requests-pending-approval",
      title: "- Requests Pending for Approval",
    },
    {
      path: "/reimbursement-request/requests-finance-manager-pending-approval",
      title: "- Requests Pending for Finance Manager  Approval",
    },
    {
      path: "/reimbursement-request/requests-pending-reimbursement",
      title: "- Requests Pending for Reimbursement",
    },
    {
      path: "/reimbursement-request/requests-reimburse-history",
      title: "- Reimbursement History",
    },
    {
      path: "/reimbursement-request/requests-worked-on",
      title: "- Requests I Have Worked On",
    },
    {
      path: "/reimbursement-request/delegation",
      title: "- Delegation",
    },
  ];

  const settings = [
    {
      path: "/settings/configure-delegation",
      title: "- Configure Delegation",
    },
    {
      path: "/settings/sap-reporting",
      title: "- SAP Reporting Configurations",
    },
  ];

  return (
    <div className="sidebar">
      <div className="grid place-content-center mt-6">
        <img
          src={qmlogo}
          className="d-inline-block align-top w-32 h-14 m-auto "
          alt="Logo"
        />
      </div>
      <List className="px-2 pt-4">
        <CustomListItem
          title="Dashboard"
          icon={CircleOutlinedIcon}
          path="/"
          handleClick={handleClick}
          open={open}
        />
        <CustomListItem
          title="My Info"
          icon={CircleOutlinedIcon}
          path="/vendor"
          handleClick={handleClick}
          open={open}
        />
        <CustomListItem
          title="My Purchase Order"
          icon={CircleOutlinedIcon}
          path="/my-purchase-order"
          handleClick={handleClick}
          open={open}
        />
        <CustomListItem
          title="My Invoices"
          icon={CircleOutlinedIcon}
          path="/invoice"
          handleClick={handleClick}
          open={open}
        />
        <CustomListItem
          title="My Payment Receipt"
          icon={CircleOutlinedIcon}
          path="/my-payment-receipt"
          handleClick={handleClick}
          open={open}
        />
        
        {/* <CustomListItem
          title="Reimbursement Requests"
          icon={RequestIcon}
          handleClick={handleClick}
          open={open}
          subItemList={reimbursementRequests?.filter((item, index) => {
            if (index !== 6 && index !== 7 && index !== 8) {
              return item;
            } else if (user?.IsFinanceManager) {
              return item;
            }
          })}
        /> */}
        {user?.IsAdmin && (
          <CustomListItem
            title="Audit Trails"
            icon={AuditIcon}
            path="/audit-trail"
            handleClick={handleClick}
            open={open}
          />
        )}
        {user?.IsAdmin && (
          <CustomListItem
            title="Settings"
            icon={SettingsIcon}
            handleClick={handleClick}
            open={open}
            subItemList={settings}
          />
        )}
      </List>
    </div>
  );
};

export default SideBar;
