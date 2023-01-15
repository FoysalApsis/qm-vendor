import { Form, Formik } from "formik";
import React, { useContext, useEffect } from "react";
import DelegateTable from "../../../components/layout/delegateTable";
import PageHeader from "../../../components/layout/pageHeader";
import PageLayout from "../../../components/layout/pageLayout";
import Table from "../../../components/layout/table/Table";
import AuthContext from "../../../context/authContext/AuthContext";
import useDelegation from "./useDelegation";

const Delegation = () => {
  const {
    columns,
    customFields,
    setCustomFields,
    columnsPrev,
    rowsState,
    setRowsState,
    data,
    mutate,
    dataPrev,
    searchPrev,
    setSearchPrev,
    isLoadingPrev,
  } = useDelegation("type=current_single", "type=previous_single");

  const { user } = useContext(AuthContext);
  const from_user = user?.displayName + "," + user?.mail;

  useEffect(() => {
    if (data) {
      setCustomFields((prev) => [
        {
          ...prev[0],
          id: data[0]?.id,
          delegate_to: data[0] && {
            label: data[0]?.to_user_dn + " (" + data[0]?.to_user_email + ")",
            value: data[0]?.to_user_dn + "," + data[0]?.to_user_email,
          },
          isActive: data[0]?.isActive,
        },
      ]);
    }
  }, [data, setCustomFields]);

  return (
    <>
      <PageLayout />
      <PageHeader title="Delegation" />
      <div className="main-container">
        <Formik
          initialValues={{}}
          validationSchema={""}
          onSubmit={async (values, { resetForm }) => {
            mutate(
              { ...customFields[0], from_user: from_user },
              {
                onSuccess: () => {
                  resetForm();
                },
              }
            );
          }}
        >
          {({ submitForm }) => (
            <Form>
              {data && data[0]?.isActive ? (
                <h5>Active Delegation</h5>
              ) : (
                <p>Select a user from the list to delegate your tasks</p>
              )}
              <DelegateTable
                headers={columns}
                customFields={customFields}
                setCustomFields={setCustomFields}
                userActive={true}
              />
            </Form>
          )}
        </Formik>
        <div className="mt-5">
          <h5>Previous Delegation</h5>
          <Table
            width="572px"
            mt={"30px"}
            columns={columnsPrev}
            data={dataPrev ? dataPrev : []}
            search={searchPrev}
            setSearch={setSearchPrev}
            loading={isLoadingPrev}
            rowsState={rowsState}
            setRowsState={setRowsState}
            rowheight={50}
            hideToolbar={true}
          />
        </div>
      </div>
    </>
  );
};

export default Delegation;
