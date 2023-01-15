import React, { useState } from "react";
import PageLayout from "../../../components/layout/pageLayout";
import PageHeader from "../../../components/layout/pageHeader";
import FullSpinner from "../../../components/layout/FullSpinner";
import useAuditTrail from "./useAuditTrailSingle";
import moment from "moment";
import { format } from "timeago.js";
import { Accordion, Col, Row, Spinner } from "react-bootstrap";
import "./AuditTrailSingle.scss";

const AuditTrail = () => {
  const [collapse, setCollapse] = useState(false);
  const [sort, setSort] = useState("ASC");
  const { isLoading, audit_data, pdfData, fetchPdf, isFetching, ref } =
    useAuditTrail(`order=${sort}`);
  const setOnClickSort = () => {
    if (sort === "DESC") {
      setSort("ASC");
    } else {
      setSort("DESC");
    }
  };

  let func = (key, value) => {
    let obj = {
      "Start Date": () => {
        return value !== "-" ? moment(value).format("DD MMM YYYY") : "-";
      },
      "End Date": () => {
        return value !== "-" ? moment(value).format("DD MMM YYYY") : "-";
      },
      "Start Time": () => {
        return value !== "-"
          ? value?.length <= 5
            ? value
            : moment(value).utc().format("HH:mm")
          : "-";
      },
      "End Time": () => {
        return value !== "-"
          ? value?.length <= 5
            ? value
            : moment(value).utc().format("HH:mm")
          : "-";
      },
      Amount: () => {
         return value !== "-" ? parseFloat(value)?.toFixed(2) : "-";
      },
      Status: () => {
        return value;
      },
      Image: () => {
        return value !== "-" ? (
          <a
            href={`${process.env.REACT_APP_API_URL}/${value?.slice(9)}`}
            target="_blank"
            rel="noreferrer"
          >
            {value?.slice(31)}
          </a>
        ) : (
          "-"
        );
      },
    };
    return obj[key] ? obj[key]() : "-";
  };

  return (
    <>
      <PageLayout />
      <PageHeader title="Audit Trails">
        <div>
          <button
            className="button-prime"
            onClick={() => setCollapse((prev) => !prev)}
          >
            {collapse ? "Collapse" : "Expand"} All
          </button>
          <button className="button-prime" onClick={setOnClickSort}>
            Sort {sort === "ASC" ? "DESC" : "ASC"}
          </button>
          <button className="button-prime" onClick={() => fetchPdf()}>
            {" "}
            {isFetching && (
              <Spinner animation="border" variant="light" size="sm" />
            )}{" "}
            Get PDF
          </button>
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
        </div>
      </PageHeader>
      <div className="main-container">
        {isLoading && <FullSpinner />}
        <div
          className="audit-header d-flex flex-column justify-content-start align-items-center pb-3 pt-1"
          style={{
            width: "100%",
            fontSize: "0.9rem",
            borderBottom: "1px solid var(--dark)",
          }}
        >
          <div style={{ width: "100%" }} className="d-flex">
            <div style={{ width: "15%" }}>
              <p className="medium">Created:</p>
            </div>
            <div
              style={{ width: "85%" }}
              className="d-flex justify-content-between"
            >
              <p className="font-light">
                {audit_data &&
                  moment(audit_data?.created_at).format(
                    "DD MMM YYYY H:mm:ss "
                  ) +
                    " by " +
                    audit_data?.createdby_dn}
              </p>
            </div>
          </div>
          <div></div>
          <div style={{ width: "100%" }} className="d-flex">
            <div style={{ width: "15%" }}>
              <p className="medium">Last Updated:</p>
            </div>
            <div style={{ width: "85%" }}>
              <p className="font-light">
                {audit_data &&
                  moment(audit_data?.updated_at).format("DD MMM YYYY H:mm:ss ")}
              </p>
            </div>
          </div>

          <div style={{ width: "100%" }} className="d-flex">
            <div style={{ width: "15%" }}>
              <p className="medium">Update Count:</p>
            </div>
            <div style={{ width: "85%" }}>
              <p className="font-light">
                {audit_data && audit_data?.AuditTrials?.length}
              </p>
            </div>
          </div>
        </div>

        {/* Main Body */}
        {audit_data?.AuditTrials &&
          audit_data?.AuditTrials?.map((audit, index) => {
            const changes = audit?.changes && JSON.parse(audit?.changes);

            return (
              <Accordion
                key={index}
                className="audit-accordion"
                flush
                defaultActiveKey={!collapse ? undefined : audit.created_at}
                // defaultActiveKey={!collapse ? undefined : activeKeys}
              >
                <Accordion.Item
                  // eventKey={collapse ? undefined : audit.created_at}
                  eventKey={collapse ? undefined : audit?.created_at}
                  id={audit.created_at}
                  className="border-bottom"
                >
                  <Accordion.Header className="audit-accordion-header">
                    <p className="m-0">
                      {moment(audit?.created_at).format("DD MMM YYYY H:mm:ss ")}
                      <b>{audit.is_created ? "Created by" : "Updated by"} </b>
                      {audit.createdby_dn}
                    </p>
                  </Accordion.Header>
                  <Accordion.Body className="audit-accordion-body">
                    <div className="ps-2 pt-2 pb-5">
                      <ul>
                        <li>
                          Activities performed{" "}
                          {audit && format(audit.created_at)}{" "}
                        </li>
                      </ul>
                      {audit?.type === "email" && (
                        <div>
                          <div
                            className="text-center d-flex justify-content-center py-1"
                            style={{ background: "#dfdfdf" }}
                          >
                            Email Record
                          </div>
                          <div className="p-2 border-bottom">
                            To :- {changes?.to}
                          </div>
                          <div
                            className="p-2 border-bottom"
                            style={{
                              overflowWrap: "break-word",
                            }}
                          >
                            {`  Cc :- ${changes?.cc?.replace(/,/g, ", ")}`}
                          </div>

                          <div className="p-2 border-bottom">
                            Subject :- {changes?.subject}
                          </div>
                        </div>
                      )}
                      {audit?.type === "data" && (
                        <>
                          <div
                            className="text-center d-flex justify-content-center py-1 my-2"
                            style={{ background: "#dfdfdf" }}
                          >
                            Activities Performed
                          </div>
                          <Row sm={12} className="text-center gx-2">
                            <Col sm={4}>
                              <div
                                style={{ background: "#dfdfdf" }}
                                className="py-1"
                              >
                                Updated Fields
                              </div>
                            </Col>
                            <Col sm={4}>
                              <div
                                style={{ background: "#dfdfdf" }}
                                className="py-1"
                              >
                                Before
                              </div>
                            </Col>
                            <Col sm={4}>
                              <div
                                style={{ background: "#dfdfdf" }}
                                className="py-1"
                              >
                                After
                              </div>
                            </Col>
                          </Row>

                          {Object.entries(changes?.before)?.map(
                            ([key, value]) => (
                              <Row key={key} sm={12} className="gx-2">
                                {audit_data?.audit_fields[key] && (
                                  <>
                                    <Col sm={4}>
                                      <div
                                        style={{ height: "100%" }}
                                        className="py-1 px-1 border-bottom"
                                      >
                                        {audit_data?.audit_fields[key]}
                                      </div>
                                    </Col>
                                    <Col sm={4}>
                                      <div
                                        style={{
                                          height: "100%",
                                          overflowWrap: "break-word",
                                        }}
                                        className="py-1 px-1 border-bottom"
                                      >
                                        {func(
                                          audit_data?.audit_fields[key],
                                          value
                                        )}
                                      </div>
                                    </Col>

                                    <Col sm={4}>
                                      <div
                                        style={{
                                          height: "100%",
                                          overflowWrap: "break-word",
                                        }}
                                        className="py-1 px-1 border-bottom"
                                      >
                                        {func(
                                          audit_data?.audit_fields[key],
                                          changes?.after[key]
                                        )}
                                      </div>
                                    </Col>
                                  </>
                                )}
                              </Row>
                            )
                          )}
                        </>
                      )}
                      {changes?.comment && (
                        <div
                          style={{
                            color: "#000",
                          }}
                          className="px-2 py-1 mb-3 border-top"
                        >
                          <b>Comments :- {changes?.comment}</b>
                        </div>
                      )}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            );
          })}
      </div>
    </>
  );
};

export default AuditTrail;
