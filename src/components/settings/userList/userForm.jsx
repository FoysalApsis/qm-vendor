import { useFormikContext } from "formik";
import React from "react";
import { Col, FormControl, Row } from "react-bootstrap";
import MultipleAutoSelectField from "../../formsUI/MultipleAutoSelectField";
import SelectField from "../../formsUI/SelectField";

const UserForm = ({ roles }) => {
  const {
    values: { ad_logon_name },
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
            <p>Logon Name</p>
          </div>
          <div style={{ width: "70%" }}>
            <FormControl
              name="ad_logon_name"
              className="max-height"
              onChange={handleChange}
              onBlur={handleBlur}
              value={ad_logon_name ? ad_logon_name : ""}
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
            className="d-flex justify-content-between align-items-center label-container border-end-0 border-top-0"
          >
            <p>Roles</p>
          </div>
          <div style={{ width: "70%" }} className="border border-top-0">
            <MultipleAutoSelectField name="roles" options={roles} />
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
            className="d-flex justify-content-between align-items-center label-container border-end-0 border-top-0"
          >
            <p>Active</p>
          </div>
          <div style={{ width: "70%" }}>
            <SelectField
              name="status"
              options={[
                { label: "Active", value: "active" },
                { label: "InActive", value: "InActive" },
              ]}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default UserForm;
