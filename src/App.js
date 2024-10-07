import { useMediaQuery } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthState from "./context/authContext/AuthState";
import CommonState from "./context/commonContext/CommonState";
import AuditTrail from "./pages/auditTrail";
import AuditTrailSingle from "./pages/auditTrail/auditTrailSingle";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import LoginMSAL from "./pages/loginMSAL";
import ReimbursementRoutes from "./pages/reimbursementRequest/ReimbursementRoutes";
import SettingsRoutes from "./pages/settings/SettingsRoutes";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import PageNotFound from "./components/layout/PageNotFound";
import SingleVendor from "./pages/vendors/singleVendor";
import MyPurchaseOrder from "./pages/purchase-orders";
import SinglePO from "./pages/purchase-orders/SinglePO";
import Invoices from "./pages/Invoice";
import CreateBill from "./pages/Invoice/CreateBill";
import PaymentReceipts from "./pages/payment-receipts";
import SinglePR from "./pages/payment-receipts/SinglePR";
import NewLogin from "./pages/login/NewLogin";

function App() {
  const isTab = useMediaQuery("(max-width:900px)");
  const isMobile = useMediaQuery("(max-width:600px)");
  
  return (
    <AuthState>
      <CommonState>
        <Routes>
          <Route
            path="/sign-in"
            element={
              <PublicRoute restricted={false}>
                {/* {process.env.REACT_APP_ENVIRONMENT === "development" ?
                    <Login isTab={isTab} /> : 
                    <LoginMSAL isTab={isTab} />
                } */}
                <NewLogin></NewLogin>
              </PublicRoute>
            }
          />
          
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard isTab={isTab} isMobile={isMobile} />
              </PrivateRoute>
            }
          />
          <Route
            path="/reimbursement-request/*"
            element={<ReimbursementRoutes isTab={isTab} isMobile={isMobile} />}
          />
          <Route
            path="/audit-trail"
            element={
              <PrivateRoute>
                <AuditTrail isTab={isTab} isMobile={isMobile} />
              </PrivateRoute>
            }
          />
          <Route
            path="/audit-trail/:id"
            element={
              <PrivateRoute>
                <AuditTrailSingle isTab={isTab} isMobile={isMobile} />
              </PrivateRoute>
            }
          />
          <Route
            path="/vendor"
            element={
              <PrivateRoute>

                <SingleVendor isTab={isTab} isMobile={isMobile} />
                </PrivateRoute>

            }
          />
           <Route
            path="/my-purchase-order"
            element={
              <PrivateRoute>
                <MyPurchaseOrder />
              </PrivateRoute>
            }
          />
           <Route
            path="/my-purchase-order/:id"
            element={
              <PrivateRoute>
                <SinglePO></SinglePO>
                </PrivateRoute>
            }
          />
          <Route
            path="/invoice"
            element={
              <PrivateRoute>
                <Invoices />
              </PrivateRoute>
            }
          />
          <Route
            path="/invoice/create-bill"
            element={
              <PrivateRoute>
              <CreateBill></CreateBill>
              </PrivateRoute>
            }
          />
          <Route
            path="/my-payment-receipt"
            element={
              <PrivateRoute>
              <PaymentReceipts></PaymentReceipts>
              </PrivateRoute>
            }
          />
          <Route
            path="/my-payment-receipt/:id"
            element={
              <PrivateRoute>
              <SinglePR></SinglePR>
              </PrivateRoute>
            }
          />
             
      
          
          <Route path="/settings/*" element={<SettingsRoutes />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <PageNotFound />
              </PrivateRoute>
            }
          />
        </Routes>
      </CommonState>
    </AuthState>
  );
}

export default App;
