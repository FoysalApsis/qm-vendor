import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateRequest from "./createRequest";
import RequestsPendingApproval from "./requestsPendingApproval";
import ClosedRequests from "./closedRequests";
import Delegation from "./delegation";
import OpenRequestsRoutes from "./openRequests/OpenRequestsRoutes";
import PrivateRoute from "../../utils/PrivateRoute";
import RequestsWorkedOn from "./requestsWorkedOn";
import PageNotFound from "../../components/layout/PageNotFound";
import RejectedRequests from "./rejectedRequests";
import RequestsSentForApproval from "./requestsSentForApproval";
import RequestsFinanceManagerPendingApproval from "./requestsFinanceManagerPendingApproval";
import RequestsPendingReimbursement from "./requestsPendingReimbursement";
import ReimburseHistory from "./reimburseHistory";

const ReimbursementRoutes = ({ isTab, isMobile }) => {
  return (
    <>
      <PrivateRoute>
        <Routes>
          <Route
            path="/create-request"
            element={<CreateRequest isTab={isTab} isMobile={isMobile} />}
          />
          <Route
            path="/open-requests/*"
            element={<OpenRequestsRoutes isTab={isTab} isMobile={isMobile} />}
          />
          <Route path="/closed-requests" element={<ClosedRequests />} />
          <Route path="/rejected-requests" element={<RejectedRequests />} />
          <Route
            path="/requests-sent-for-approval"
            element={<RequestsSentForApproval />}
          />
          <Route
            path="/requests-pending-approval"
            element={<RequestsPendingApproval />}
          />
          <Route
            path="/requests-finance-manager-pending-approval"
            element={<RequestsFinanceManagerPendingApproval />}
          />
          <Route
            path="/requests-pending-reimbursement"
            element={<RequestsPendingReimbursement />}
          />
          <Route
            path="/requests-reimburse-history"
            element={<ReimburseHistory />}
          />
          <Route path="/requests-worked-on" element={<RequestsWorkedOn />} />
          <Route path="/delegation" element={<Delegation />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </PrivateRoute>
    </>
  );
};

export default ReimbursementRoutes;
