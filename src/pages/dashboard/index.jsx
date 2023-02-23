import React, { useContext } from "react";
import PageLayout from "../../components/layout/pageLayout";
import PageHeader from "../../components/layout/pageHeader";
import DashboardBlock from "../../components/layout/dashboardBlock";
import "./Dashboard.scss";
import { Alert, Grid } from "@mui/material";
import useDashboard from "./useDashboard";
import AuthContext from "../../context/authContext/AuthContext";

const Dashboard = ({ isTab, isMobile }) => {
  // const { dashboardData, delegateData } = useDashboard();
  // const delegated_users = delegateData?.my_delegated_user;
  // const delegated_to_me = delegateData?.users_delegated_to_me;
  const { user } = useContext(AuthContext);
  return (
    <>
     <div className='main-container'>
      <PageLayout />
      <PageHeader title="Dashboard" />
      <div className="w-100 h-100" style={{display:"grid",placeContent:"center",fontSize:"25px"}}>
        Coming Soon...
      </div>

     </div>

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
