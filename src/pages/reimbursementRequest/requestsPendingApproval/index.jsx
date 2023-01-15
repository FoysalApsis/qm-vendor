import React, { useContext } from "react";
import PageHeader from "../../../components/layout/pageHeader";
import PageFooter from "../../../components/layout/pageFooter";
import PageLayout from "../../../components/layout/pageLayout";
import Table from "../../../components/layout/table/Table";
import useRequestsPendingApproval from "./useRequestsPendingApproval";
import useRequests from "../useRequests";
import { Spinner } from "react-bootstrap";
import AuthContext from "../../../context/authContext/AuthContext";

const RequestsPendingApproval = () => {
  const user = useContext(AuthContext);
  const DocName = "Requests Pending for Approval";
  const {
    rowsState,
    setRowsState,
    data,
    refetchRequest,
    RequestLoading,
    search,
    setSearch,
    pdfData,
    excelData,
    fetchPdf,
    fetchExcel,
    excelLoading,
    pdfLoading,
    ref,
    excelRef,
  } = useRequests("type=request_ln_manager", `document_type=${DocName}`);

  const { columns, setSelectedRows, selectedRows, mutate, isLoading } =
    useRequestsPendingApproval(user, refetchRequest);

  return (
    <>
      <PageLayout />
      <PageHeader title={DocName}>
        <a
          href={pdfData}
          target="_blank"
          rel="noreferrer"
          hidden
          ref={ref}
          download
        >
          pdf
        </a>
        <a
          href={excelData}
          target="_blank"
          rel="noreferrer"
          hidden
          ref={excelRef}
          download
        >
          excel
        </a>
        <div>
          <button
            onClick={() => {
              fetchExcel();
            }}
            className="button-prime"
          >
            {excelLoading && (
              <Spinner animation="border" variant="light" size="sm" />
            )}{" "}
            Get Excel
          </button>
          <button
            onClick={() => {
              fetchPdf();
            }}
            className="button-prime"
          >
            {pdfLoading && (
              <Spinner animation="border" variant="light" size="sm" />
            )}{" "}
            Get PDF
          </button>
        </div>
      </PageHeader>
      <div className="main-container">
        <Table
          width="1724px"
          mt={"30px"}
          setSelectedRows={setSelectedRows}
          columns={columns}
          data={data ? data : []}
          checkboxSelection={true}
          search={search}
          setSearch={setSearch}
          rowsState={rowsState}
          setRowsState={setRowsState}
          loading={RequestLoading}
          rowheight={50}
        />
      </div>
      <PageFooter>
        <button
          onClick={() => {
            selectedRows?.length > 0 &&
              mutate(
                {
                  request_ids: selectedRows,
                  type: "approve_lm",
                },
                { onSuccess: () => refetchRequest() }
              );
          }}
          className="button-prime"
        >
          {isLoading && (
            <Spinner animation="border" variant="light" size="sm" />
          )}{" "}
          APPROVE SELECTED
        </button>
      </PageFooter>
    </>
  );
};

export default RequestsPendingApproval;
