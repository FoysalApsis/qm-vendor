import { useMediaQuery } from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import { Modal, FormControl, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";

const RejectModal = ({
  title,
  name,
  mutate,
  selectedRow,
  IsFinanceManager,
  isLoading,
}) => {
  const isTab = useMediaQuery("max-width:900px");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button
        onClick={handleShow}
        type="button"
        className="button-primary button-link"
      >
        {name}{" "}
        {/* {updateLoading && (
          <Spinner
            animation="border"
            className="ms-2"
            variant="light"
            size="sm"
          />
        )} */}
      </button>

      <Modal className="reject-modal" show={show} onHide={handleClose}>
        <Formik
          enableReinitialize={true}
          initialValues={{
            comment: "",
          }}
          validationSchema={Yup.object().shape({
            comment: Yup.string().required("Comment is required!"),
          })}
          onSubmit={async (values, { resetForm }) => {
            mutate(
              {
                request_ids: [selectedRow],
                type: IsFinanceManager === true ? "reject_fm" : "reject_lm",
                comment: values?.comment,
              },
              {
                onSuccess: () => {
                  resetForm();
                  handleClose();
                },
              }
            );
          }}
        >
          {({ values, handleChange, errors }) => (
            <Form>
              <Modal.Header
                style={{
                  backgroundColor: "var(--primary)",
                  height: "45px",
                }}
                closeButton
              >
                <Modal.Title
                  style={{ fontSize: `${!isTab ? "15px" : "20px"}` }}
                  className="medium"
                >
                  {title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body
                style={{ backgroundColor: "#fff3dd" }}
                className="font-light"
              >
                <div className="d-flex flex-column p-2">
                  <div className="mb-2 mt-2">
                    <FormControl
                      aria-label="comment"
                      className="max-height"
                      as="textarea"
                      name="comment"
                      rows={3}
                      value={values?.comment}
                      onChange={handleChange}
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
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer
                style={{
                  background: "#fff3dd",
                }}
              >
                <button
                  type="submit"
                  onClick={() =>
                    errors?.comment && toast.error(errors?.comment)
                  }
                  className="button-prime"
                >
                  {isLoading && (
                    <Spinner animation="border" variant="light" size="sm" />
                  )}{" "}
                  CONFIRM REJECT{" "}
                </button>

                <button
                  className="button-prime"
                  type="button"
                  onClick={handleClose}
                >
                  CANCEL
                </button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default RejectModal;
