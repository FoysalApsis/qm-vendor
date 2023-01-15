import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../../components/layout/pageHeader";
import PageLayout from "../../../components/layout/pageLayout";
import Table from "../../../components/layout/table/Table";
import useReimburseHistory from "./useReimburseHistory";
import AuthContext from "../../../context/authContext/AuthContext";
import { useNavigate } from "react-router-dom";
import DateInput from "../../../components/formsUI/DateInput";
import { Form, Formik } from "formik";
import { Grid } from "@mui/material";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const ReimburseHistory = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const DocName = "Reimbursement History";
  const [date, setDate] = useState({ from: "", to: "" });
  const {
    columns,
    rowsState,
    setRowsState,
    data,
    refetchRequest,
    RequestLoading,
  } = useReimburseHistory(
    `&from=${moment(date?.from).format("MM-YYYY")}&to=${moment(
      date?.to ? date?.to : date?.from
    ).format("MM-YYYY")}`
  );

  useEffect(() => {
    if (!user?.IsFinanceManager) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <PageLayout />
      <PageHeader title={DocName} />
      <Formik
        enableReinitialize={true}
        initialValues={{}}
        validationSchema={""}
        onSubmit={async (values, { resetForm }) => {}}
      >
        {({ values }) => (
          <Form>
            <div className="main-container">
              <Grid
                container
                style={{
                  border: "1px solid rgba(224, 224, 224, 1)",
                  borderRadius: "6px",
                  width: "auto",
                  padding: "1em 0.5em",
                  maxWidth: "1100px",
                  marginRight: "20px",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={4}
                  className="d-flex align-items-center justify-content-center mb-2 ps-1"
                >
                  <p className="m-0 me-2"> From Month:</p>

                  <DateInput
                    name="from"
                    value={date?.from}
                    onlyMonth
                    style={{
                      width: "150px",
                    }}
                    setValue={(value) =>
                      setDate((prev) => ({
                        ...prev,
                        from: value,
                      }))
                    }
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={4}
                  className="d-flex align-items-center justify-content-center mb-2 ps-1"
                >
                  <p className="m-0 me-2"> To Month:</p>
                  <DateInput
                    name="to"
                    onlyMonth
                    style={{ width: "150px" }}
                    value={date?.to}
                    setValue={(value) =>
                      setDate((prev) => ({ ...prev, to: value }))
                    }
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={4}
                  className="d-flex align-items-center justify-content-center"
                >
                  <button
                    type="submit"
                    onClick={() => {
                      !date?.from
                        ? toast.error("please enter from month!")
                        : refetchRequest();
                    }}
                    className="button-prime"
                  >
                    {RequestLoading && (
                      <Spinner animation="border" variant="light" size="sm" />
                    )}{" "}
                    SEARCH
                  </button>
                </Grid>
              </Grid>
              <Table
                width="1372px"
                mt={"30px"}
                columns={columns}
                data={data ? data : []}
                rowsState={rowsState}
                setRowsState={setRowsState}
                clientPagination
                loading={false}
                rowheight={50}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ReimburseHistory;
