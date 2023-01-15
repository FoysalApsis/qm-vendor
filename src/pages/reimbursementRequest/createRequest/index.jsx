import React, { useState } from "react";
import PageFooter from "../../../components/layout/pageFooter";
import PageHeader from "../../../components/layout/pageHeader";
import PageLayout from "../../../components/layout/pageLayout";
import useCreateRequest from "./useCreateRequest";
import { Form, Formik } from "formik";
import SimpleTable from "../../../components/layout/simpleTable";
import MobileCreateReqForm from "../../../components/reimbursementRequest/createRequest/MobileCreateReqForm";
import { Spinner } from "react-bootstrap";

const CreateRequest = ({ isTab, isMobile }) => {
  const { columns, customFields, setCustomFields, mutate, isLoading } =
    useCreateRequest();

  const [imgURL, setImgURL] = useState("");
  return (
    <>
      <PageLayout />
      <PageHeader title="New Request" />
      <Formik
        initialValues={{}}
        validationSchema={""}
        onSubmit={async (values, { resetForm }) => {
          mutate(customFields, {
            onSuccess: () => {
              resetForm();
              setImgURL("");
            },
            onError: () => {
              setImgURL("");
            },
          });
        }}
      >
        {({ submitForm }) => (
          <Form>
            <div className="main-container">
              <p className="m-0">All fields are mandatory</p>
              {!isTab && (
                <>
                  <SimpleTable
                    headers={columns}
                    customFields={customFields}
                    setCustomFields={setCustomFields}
                  />
                  <PageFooter>
                    <button type="submit" className="button-prime">
                      {isLoading && (
                        <Spinner animation="border" variant="light" size="sm" />
                      )}{" "}
                      SUBMIT
                    </button>
                  </PageFooter>
                </>
              )}
              {isTab && (
                <>
                  {" "}
                  <MobileCreateReqForm
                    customFields={customFields}
                    setCustomFields={setCustomFields}
                    imgURL={imgURL}
                    setImgURL={setImgURL}
                  />{" "}
                </>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateRequest;
