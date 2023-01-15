import React from "react";
import "./SimpleTable.scss";
import { TextField } from "@mui/material";
import DateInput from "../../formsUI/DateInput";
import TimeInput from "../../formsUI/TimeInput";
import FileInput from "../../formsUI/FileInput";

const SimpleTable = ({
  headers,
  customFields,
  setCustomFields,
  updateTable,
}) => {
  const handleChange = (e, item) => {
    setCustomFields((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, [e.target.name]: e.target.value } : i
      )
    );
  };
  return (
    <>
      <div className="table-container">
        <table className="table-box my-3">
          <thead className="thead">
            <tr>
              {headers?.map((item) => (
                <th
                  key={item?.headerName}
                  className="th"
                  style={{ ...item.styles }}
                >
                  {item.headerName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customFields.map((item) => (
              <tr key={item?.id}>
                <td className="td">{item?.no}</td>
                <td className="td">
                  <DateInput
                    name="start_date"
                    value={item.start_date}
                    setValue={(value) => {
                      setCustomFields((prev) =>
                        prev.map((i) =>
                          i.id === item.id ? { ...i, start_date: value } : i
                        )
                      );
                    }}
                    variant="standard"
                  />
                </td>
                <td className="td">
                  {" "}
                  <TimeInput
                    name="start_time"
                    value={item.start_time}
                    setValue={(value) => {
                      setCustomFields((prev) =>
                        prev.map((i) =>
                          i.id === item.id ? { ...i, start_time: value } : i
                        )
                      );
                    }}
                    variant="standard"
                  />{" "}
                </td>
                <td className="td">
                  <DateInput
                    name="end_date"
                    value={item.end_date}
                    setValue={(value) => {
                      setCustomFields((prev) =>
                        prev.map((i) =>
                          i.id === item.id ? { ...i, end_date: value } : i
                        )
                      );
                    }}
                    variant="standard"
                  />
                </td>
                <td className="td">
                  <TimeInput
                    name="end_time"
                    value={item.end_time}
                    setValue={(value) => {
                      setCustomFields((prev) =>
                        prev.map((i) =>
                          i.id === item.id
                            ? {
                                ...i,
                                end_time: value,
                              }
                            : i
                        )
                      );
                    }}
                    variant="standard"
                  />
                </td>
                <td className="td">
                  <TextField
                    variant="standard"
                    name="amount"
                    type={"number"}
                    inputProps={{ style: { textAlign: "right" } }}
                    value={item.amount}
                    onChange={(e) => {
                      handleChange(e, item);
                    }}
                    style={{
                      border: "none",
                      height: "100%",
                      width: "100%",
                      margin: "0px",
                    }}
                  />
                </td>
                <td className="td">
                  <FileInput
                    name="ticket"
                    onChange={(e) => {
                      setCustomFields((prev) =>
                        prev.map((i) =>
                          i.id === item.id
                            ? { ...i, ticket: e.target.files[0] }
                            : i
                        )
                      );
                    }}
                    value={item?.ticket}
                    handleDelete={() => {
                      setCustomFields((prev) =>
                        prev.map((i) =>
                          i.id === item.id ? { ...i, ticket: "" } : i
                        )
                      );
                    }}
                  />
                </td>
                {!updateTable && (
                  <td className="td">
                    {customFields?.length !== 1 && (
                      <button
                        className="button-link"
                        type="button"
                        onClick={() =>
                          setCustomFields(() =>
                            customFields?.filter((i) => i.id !== item.id)
                          )
                        }
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!updateTable && (
        <div className="d-flex justify-content-end" style={{ width: "100%" }}>
          <button
            className="button-sec mt-1 me-0"
            type="button"
            onClick={() => {
              setCustomFields((prev) => [
                ...prev,
                {
                  no: "",
                  id: Date.now(),
                  start_date: "",
                  start_time: "",
                  end_date: "",
                  end_time: "",
                  amount: "",
                  ticket: "",
                },
              ]);
            }}
          >
            ADD MORE
          </button>
        </div>
      )}
    </>
  );
};

export default SimpleTable;
