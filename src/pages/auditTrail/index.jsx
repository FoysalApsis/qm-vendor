import React, { useContext, useEffect } from "react";
import PageLayout from "../../components/layout/pageLayout";
import PageHeader from "../../components/layout/pageHeader";
import useAuditTrail from "./useAuditTrail";
import Table from "../../components/layout/table/Table";
import useRequests from "../reimbursementRequest/useRequests";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext/AuthContext";

const AuditTrail = () => {
  const { data, RequestLoading, rowsState, setRowsState, search, setSearch } =
    useRequests();
  const { columns } = useAuditTrail();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.IsAdmin) {
      navigate(-1);
    }
  }, [user, navigate]);

  return (
    <>
      <PageLayout />
      <PageHeader title="Audit Trail" />
      <div className="main-container">
        <Table
          width="1172px"
          mt={"30px"}
          columns={columns}
          data={data ? data : []}
          rowsState={rowsState}
          setRowsState={setRowsState}
          search={search}
          setSearch={setSearch}
          loading={RequestLoading}
          rowheight={50}
        />
      </div>
    </>
  );
};

export default AuditTrail;
