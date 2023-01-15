import React from "react";
import PageHeader from "../../../components/layout/pageHeader";
import PageLayout from "../../../components/layout/pageLayout";
import SAPTable from "../../../components/layout/SAPTable";
import useSAPReporting from "./useSAPReporting";
import FullSpinner from "../../../components/layout/FullSpinner";

const SAPReporting = () => {
  const { customFields, isLoading, mutate, UpdateLoading } = useSAPReporting();
  return (
    <>
      <PageLayout />
      <PageHeader title="SAP Reporting Configurations" />{" "}
      <div className="main-container pt-3">
        {isLoading && <FullSpinner />}
        <SAPTable
          customFields={customFields}
          mutate={mutate}
          UpdateLoading={UpdateLoading}
        ></SAPTable>
      </div>
    </>
  );
};

export default SAPReporting;
