import React, { useCallback, useContext, useEffect, useState } from "react";
import PageLayout from "../../components/layout/pageLayout";
import PageHeader from "../../components/layout/pageHeader";
import DashboardBlock from "../../components/layout/dashboardBlock";
import "./Dashboard.scss";
import { Alert, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import useDashboard from "./useDashboard";
import AuthContext from "../../context/authContext/AuthContext";
import MainLayout from "../../components/layout/mainLayout";
import DashboardCards from "./Cards";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InvoiceTable from "./InvoiceTable";
import PoTable from "../purchase-orders/PoTable";
import serverAPI from "../../config/serverAPI";
import { useNavigate } from "react-router-dom";
import InvoiceStatusTable from "../Invoice/InvoiceStatusTable";

const Dashboard = ({ isTab, isMobile }) => {
  const [dashboardData, setDashboardData] = useState();

  const navigate = useNavigate();
  const getDashboard = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("userObj"));
    const body = { jsonrpc: "2.0", params: { id: user.id } };
    await serverAPI
      .post(`get-dashboard`, body)
      .then((res) => {
        setDashboardData(res?.data?.response);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    getDashboard();
  }, []);

  console.log(dashboardData);
  return (
    <>
      <MainLayout pageTitle={`Dashboard`}>
        <Box className="flex mb-6">
          <DashboardCards title="Purchase Order" icon={FactCheckIcon} navigate={() => navigate('/my-purchase-order')}>
            <Typography className="text-center ">
              <div className="text-primaryColor segoe-bold text-xl">
                {dashboardData?.po}
              </div>

            </Typography>
            {/* <Typography className="text-center me-3">
              <div>3</div>
              <div>Confirmed</div>
            </Typography>
            <Typography className="text-center">
              <div>3</div>
              <div>Confirmed</div>
            </Typography> */}
          </DashboardCards>
          <DashboardCards title="Submitted Invoices" icon={FactCheckIcon} navigate={() => navigate('/invoice')}>
            <Typography className="text-center">
              <div className="text-primaryColor segoe-bold text-xl">
                {dashboardData?.bill}
              </div>
            </Typography>
          </DashboardCards>
          <DashboardCards title="Payment Receipt" icon={CreditCardIcon} navigate={() => navigate('/my-payment-receipt')}>
            <Typography className="text-center ">
              <div className="text-primaryColor segoe-bold text-xl">
                {dashboardData?.payment}
              </div>
            </Typography>
          </DashboardCards>
        </Box>

        <Box className="mb-6">
          <Box className="flex justify-between">
            <Typography className="mb-3">Purchase Orders </Typography>
            <Typography
              className="text-[#605E5C] text-xs cursor-pointer"
              fontSize={14}
              onClick={() => navigate('/my-purchase-order')}
            >
              Details{" "}
              <ArrowForwardIcon sx={{ fontSize: 14 }}></ArrowForwardIcon>
            </Typography>
          </Box>
          <PoTable isDashboard></PoTable>
        </Box>
        <Box className="mb-6">
          <Box className="flex justify-between">
            <Typography className="mb-3">Invoice Status </Typography>
            <Typography
              className="text-[#605E5C] text-xs cursor-pointer"
              fontSize={14}
              onClick={() => navigate('/invoice')}
            >
              Details{" "}
              <ArrowForwardIcon sx={{ fontSize: 14 }}></ArrowForwardIcon>
            </Typography>
          </Box>
          <InvoiceStatusTable isDashboard></InvoiceStatusTable>
        </Box>
      </MainLayout>

      {/* <div className="dashboard-container">
        {(delegated_users && Object.keys(delegated_users).length !== 0) ||
        delegated_to_me?.length > 0 ? (
          <Alert
            severity="info"
            sx={{ width: "calc(100%-310px)", marginBottom: "5px" }}
          >
            {Object.keys(delegated_users).length !== 0 && (
              <>
                {" "}
                Your tasks are delegated to{" "}
                <span style={{ fontWeight: "bold" }}> {delegated_users}</span>
              </>
            )}

            {delegated_to_me?.length > 0 && (
              <>
                {Object.keys(delegated_users).length !== 0 && " | "}
                {delegated_to_me?.map((item, index) => (
                  <>
                    {" "}
                    <span style={{ fontWeight: "bold" }}>{item} </span>
                    {delegated_to_me?.length - 1 !== index && ", "}
                  </>
                ))}
                ’s tasks have been delegated to you
              </>
            )}
          </Alert>
        ) : (
          <span className="mb-5" />
        )}
        <Grid container className="dashboard-block-container px-5">
          <DashboardBlock
            title="Open Requests"
            count={dashboardData?.my_open_requests}
            bgColor="var(--sec)"
            url="/reimbursement-request/open-requests"
          />
          <DashboardBlock
            title="Closed Requests"
            count={dashboardData?.my_closed_requests}
            bgColor="#0094AA"
            url="/reimbursement-request/closed-requests"
          />
          <DashboardBlock
            title="Rejected Requests"
            count={dashboardData?.my_rejected_requests}
            bgColor="#79807F"
            url="/reimbursement-request/rejected-requests"
          />
          <DashboardBlock
            title="Requests Sent for Approval"
            count={dashboardData?.my_requests_sent_for_approval}
            bgColor="#0092D4"
            url="/reimbursement-request/requests-sent-for-approval"
          />
          <DashboardBlock
            title="Requests Pending Approval (L M)"
            count={dashboardData?.requests_for_my_approval}
            bgColor="#CB2686"
            url="/reimbursement-request/requests-pending-approval"
          />
          {user?.IsFinanceManager && (
            <>
              {" "}
              <DashboardBlock
                title="Requests Pending Approval (F M)"
                count={dashboardData?.requests_for_my_approval_fm}
                bgColor="#0094AA"
                url="/reimbursement-request/requests-finance-manager-pending-approval"
              />
              <DashboardBlock
                title="Requests Waiting to be Reimburse"
                count={dashboardData?.requests_waiting_to_be_reimburse}
                bgColor="#79807F"
                url="/reimbursement-request/requests-pending-reimbursement"
              />{" "}
            </>
          )}
          <DashboardBlock
            title="New Request"
            count="+"
            bgColor="var(--primary)"
            color="#000"
            url="/reimbursement-request/create-request"
          />
        </Grid>
        {!isMobile && <span></span>}
      </div> */}
    </>
  );
};

export default Dashboard;
