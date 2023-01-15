import React from "react";
import "./SAPTable.scss";
import NewModal from "../modal/NewModal";
import SAPForm from "../../settings/SAPReporting/SAPForm";

const SAPTable = ({ customFields, mutate, UpdateLoading }) => {
  const headers = [
    { headerName: "Field", styles: { width: "200px" } },
    { headerName: "SAP Field Name", styles: { width: "250px" } },
    { headerName: "Value", styles: { width: "250px" } },
    { headerName: "Action", styles: { width: "150px" } },
  ];

  return (
    <>
      <div className="table-container">
        <table className="table-box my-3" style={{ position: "relative" }}>
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
            {customFields.map((item, index) => (
              <tr key={item?.id}>
                <td className="td" style={{ width: "200px" }}>
                  {item?.field}
                </td>
                <td className="td" style={{ width: "250px" }}>
                  {item?.sap_field_name}
                </td>
                <td className="td" style={{ width: "250px" }}>
                  {item?.value}
                </td>
                <td
                  className="td"
                  style={{ width: "150px", textAlign: "center" }}
                >
                  <NewModal
                    updateButton
                    name="edit"
                    title={`Update <b> ${item?.field}</b>`}
                    mutate={mutate}
                    isLoading={UpdateLoading}
                    defaultState={{
                      id: item?.id,
                      sap_field_name: item?.sap_field_name,
                      value: item?.value,
                    }}
                  >
                    <SAPForm disableFields={item?.calculated} />
                  </NewModal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SAPTable;
