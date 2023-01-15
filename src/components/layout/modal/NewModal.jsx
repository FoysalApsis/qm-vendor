import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { Formik, Form } from "formik";
import { Tooltip } from "@mui/material";

import PageHeader from "../pageHeader";

export const useModalState = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return { show, handleClose, handleShow };
};

const NewModal = ({
  title,
  heading,
  children,
  defaultState,
  validations,
  mutate,
  isLoading,
  name,
  updateButton,
  addButton,
  deleteButton,
  linkButton,
  hideFooter,
  modalLarge,
}) => {
  const { show, handleClose, handleShow } = useModalState();
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          ...defaultState,
        }}
        validationSchema={validations}
        onSubmit={async (values, { resetForm }) => {
          mutate(values, {
            onSuccess: () => {
              !updateButton && resetForm();
              handleClose();
            },
          });
        }}
      >
        {({ values, submitForm }) => (
          <Form>
            {deleteButton && (
              <div style={{ width: "100%", height: "100%" }}>
                <Tooltip title="Delete" arrow>
                  <span
                    type="button"
                    onClick={handleShow}
                    className="material-icons-outlined"
                    style={{ color: "#828282" }}
                  >
                    {name}
                  </span>
                </Tooltip>
              </div>
            )}
            {updateButton && (
              <div style={{ width: "100%", height: "100%" }}>
                <Tooltip title="Edit" arrow>
                  <span
                    type="button"
                    onClick={handleShow}
                    className="material-icons-outlined"
                    style={{ color: "#828282" }}
                  >
                    {name}
                  </span>
                </Tooltip>
              </div>
            )}
            {addButton && (
              <PageHeader title={heading}>
                <button
                  onClick={handleShow}
                  type="button"
                  className="button-prime"
                >
                  {name}
                </button>
              </PageHeader>
            )}
            {linkButton && (
              <button
                onClick={handleShow}
                type="button"
                className="button-primary button-link"
              >
                {name}{" "}
              </button>
            )}

            <Modal
              contentClassName="admin-modal"
              className="modal-medium"
              modalMedium
              size={modalLarge ? "lg" : "md"}
              centered
              show={show}
              onHide={handleClose}
            >
              <Modal.Header
                style={{
                  backgroundColor: "var(--primary)",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.34)",
                  height: "45px",
                }}
                closeButton
              >
                <Modal.Title
                  className="medium"
                  dangerouslySetInnerHTML={{ __html: title }}
                ></Modal.Title>
              </Modal.Header>
              <Modal.Body
                className="font-light px-4 pt-4"
                style={{
                  backgroundColor: "##f2f2f2da",
                }}
              >
                {children}
              </Modal.Body>
              {!hideFooter && (
                <Modal.Footer
                  style={{
                    boxShadow: "12px 12px 12px rgba(0, 0, 0, 0.25)",
                    borderTop: "0",
                  }}
                >
                  <button
                    type="submit"
                    onClick={submitForm}
                    className="button-prime"
                  >
                    {addButton && "SAVE"}
                    {updateButton && "UPDATE"}
                    {deleteButton && "DELETE"}
                    {isLoading && (
                      <Spinner
                        animation="border"
                        className="ms-2"
                        variant="light"
                        size="sm"
                      />
                    )}
                  </button>

                  <button
                    className="button-prime"
                    type="button"
                    onClick={handleClose}
                  >
                    CLOSE
                  </button>
                </Modal.Footer>
              )}
            </Modal>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default NewModal;
