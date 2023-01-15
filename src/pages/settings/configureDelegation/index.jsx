import { Form, Formik } from "formik";
import React from "react";
import DelegateTable from "../../../components/layout/delegateTable";
import PageHeader from "../../../components/layout/pageHeader";
import PageLayout from "../../../components/layout/pageLayout";
import Table from "../../../components/layout/table/Table";
import useConfigureDelegation from "./useConfigureDelegation";

const ConfigureDelegation = () => {
  const {
    columns,
    customFields,
    setCustomFields,
    columnsPrev,
    search,
    setSearch,
    data,
    isLoading,
    rowsState,
    setRowsState,
    rowsStatePrev,
    setRowsStatePrev,
    columnsActive,
    mutate,
    searchPrev,
    setSearchPrev,
    dataPrev,
    isLoadingPrev,
  } = useConfigureDelegation("type=current_multiple", "type=previous_multiple");
  return (
    <>
      <PageLayout />
      <PageHeader title="Configure Delegation" />
      <Formik initialValues={{}} validationSchema={""}>
        {({ submitForm }) => (
          <Form>
            <div className="main-container">
              <h5>Delegations</h5>
              <DelegateTable
                headers={columns}
                customFields={customFields}
                setCustomFields={setCustomFields}
                configure={true}
                mutate={mutate}
              />

              <div className="mt-5">
                <h5>Active Delegation</h5>
                <Table
                  width="1072px"
                  mt={"30px"}
                  columns={columnsActive}
                  data={data ? data : []}
                  search={search}
                  setSearch={setSearch}
                  loading={isLoading}
                  rowsState={rowsState}
                  setRowsState={setRowsState}
                  rowheight={50}
                />
              </div>

              <div className="mt-5">
                <h5>Previous Delegation</h5>
                <Table
                  width="1172px"
                  mt={"30px"}
                  columns={columnsPrev}
                  data={dataPrev ? dataPrev : []}
                  search={searchPrev}
                  setSearch={setSearchPrev}
                  loading={isLoadingPrev}
                  rowsState={rowsStatePrev}
                  setRowsState={setRowsStatePrev}
                  rowheight={50}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ConfigureDelegation;
