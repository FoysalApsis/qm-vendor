import React from "react";
import { Spinner } from "react-bootstrap";
import PageHeader from "../../../components/layout/pageHeader";
import PageLayout from "../../../components/layout/pageLayout";
import Table from "../../../components/layout/table/Table";
import useRequests from "../useRequests";
import useRequestsWorkedOn from "./useRequestsWorkedOn";

const RequestsWorkedOn = () => {
  const DocName = "Requests I Have Worked On";
  const {
    search,
    setSearch,
    rowsState,
    setRowsState,
    data,
    RequestLoading,
    pdfData,
    excelData,
    fetchPdf,
    fetchExcel,
    excelLoading,
    pdfLoading,
    ref,
    excelRef,
  } = useRequests("type=requests_worked_by_me", `document_type=${DocName}`);
  const { columns } = useRequestsWorkedOn();
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
          width="1612px"
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

export default RequestsWorkedOn;
