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
              <PublicRoute restricted={true}>
                {process.env.REACT_APP_ENVIRONMENT === "development" ?
                    <Login isTab={isTab} /> : 
                    <LoginMSAL isTab={isTab} />
                }
                
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
                <SingleVendor isTab={isTab} isMobile={isMobile} />
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
