import React, { useContext, useEffect, useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { FormControl, Spinner } from "react-bootstrap";
import moment from "moment";
import * as Yup from "yup";
import "./Resubmit.scss";
import PageFooter from "../../../../components/layout/pageFooter";
import PageHeader from "../../../../components/layout/pageHeader";
import PageLayout from "../../../../components/layout/pageLayout";
import useResubmit from "./useResubmit";
import SimpleTable from "../../../../components/layout/simpleTable";
import MobileCreateReqForm from "../../../../components/reimbursementRequest/createRequest/MobileCreateReqForm";
import FullSpinner from "../../../../components/layout/FullSpinner";
import { AuditActionIcon } from "../../../../utils/Icons";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../../../context/authContext/AuthContext";

const Resubmit = ({ isTab }) => {
  const {
    columns,
    customFields,
    setCustomFields,
    mutate,
    isLoading,
    data,
    auditLoading,
  } = useResubmit();
  const params = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [imgURL, setImgURL] = useState("");

  useEffect(() => {
    if (typeof data?.image_url === "string") {
      setImgURL(`${process.env.REACT_APP_API_URL}${data?.image_url?.slice(8)}`);
    }

    if (data) {
      if (
        data?.createdby_email !== user?.mail ||
        (data?.Status?.id !== 7 && data?.Status?.id !== 9)
      ) {
        navigate("/reimbursement-request/open-requests");
      }
    }

    //eslint-disable-next-line
  }, [data, user]);

  return (
    <>
      <PageLayout />
      <PageHeader title="Resubmit">
        {" "}
        <a href={`/audit-trail/${params?.id}`} title="Audit Trial">
          <AuditActionIcon />
        </a>
      </PageHeader>
      {auditLoading && <FullSpinner />}
      <Formik
        enableReinitialize={true}
        initialValues={{
          comment: "",
        }}
        validationSchema={Yup.object().shape({
          comment: Yup.string().required("Comment is required!"),
        })}
        onSubmit={async (values, { resetForm }) => {
          mutate([{ ...customFields[0], comment: values?.comment }], {
            onSuccess: () => {
              resetForm();
            },
          });
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <div className="main-container" style={{ position: "relative" }}>
              {!isTab && (
                <>
                  {" "}
                  <SimpleTable
                    headers={columns}
                    customFields={customFields}
                    setCustomFields={setCustomFields}
                    updateTable={true}
                  />
                  Comment<span style={{ color: "red" }}>*</span> :
                  <FormControl
                    aria-label="comment"
                    as="textarea"
                    name="comment"
                    rows={3}
                    placeholder="Insert your comment"
                    onChange={handleChange}
                    style={{ background: "#F2F2F2" }}
                  />
                  <ErrorMessage
                    name="comment"
                    render={(msg) => (
                      <div
                        style={{
                          color: "red",
                          marginBottom: "5px",
                          marginTop: "5px",
                        }}
                      >
                        {msg}
                      </div>
                    )}
                  />
                  {data?.ApprovalLogs?.length > 0 && (
                    <div className="comment-container border-top d-flex flex-column py-2">
                      <p>Comments:</p>
                      <div className="comment-data d-flex flex-column ms-3">
                        {data?.ApprovalLogs?.map((item) => (
                          <p key={item?.created_at}>
                            {" "}
                            <span style={{ fontWeight: "600" }}>
                              {item?.approvedby_dn}
                            </span>
                            : {item?.comment} |{" "}
                            {moment(item?.created_at).format("DD/MM/YYYY")} -{" "}
                            {moment(item?.created_at).format("HH:mm")}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                  <PageFooter>
                    <button type="submit" className="button-prime">
                      {isLoading && (
                        <Spinner animation="border" variant="light" size="sm" />
                      )}{" "}
                      RESUBMIT
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
                    updateTable={true}
                    commentData={data?.ApprovalLogs}
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

export default Resubmit;
