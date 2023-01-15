import { useFormikContext } from "formik";
import React from "react";
import { Col, FormControl, Row } from "react-bootstrap";

const SAPForm = ({ disableFields }) => {
  const {
    values: { sap_field_name, value },
    handleChange,
    handleBlur,
  } = useFormikContext();
  return (
    <>
      <Row sm={12}>
        <Col
          sm={12}
          className="p-0 d-flex justify-content-center alig-items-center"
        >
          <div
            style={{ width: "30%" }}
            className="d-flex justify-content-between align-items-center label-container border-end-0"
          >
            <p className="m-0">SAP Field Name</p>
          </div>
          <div style={{ width: "70%" }}>
            <FormControl
              name="sap_field_name"
              className="max-height"
              onChange={handleChange}
              onBlur={handleBlur}
              value={sap_field_name ? sap_field_name : ""}
            />
          </div>
        </Col>
      </Row>
      <Row sm={12}>
        <Col
          sm={12}
          className="p-0 d-flex justify-content-center alig-items-center"
        >
          <div
            style={{ width: "30%" }}
            className="d-flex justify-content-between align-items-center label-container border-end-0"
          >
            <p className="m-0">Value</p>
          </div>
          <div style={{ width: "70%" }}>
            <FormControl
              name="value"
              className="max-height"
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={disableFields}
              value={value ? value : ""}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SAPForm;
