import React from "react";
import "./NewTable.scss";
import SelectField from "../../formsUI/SelectField";
import useGetAll from "../../../hooks/useGetAll";

const DelegateTable = ({
  headers,
  customFields,
  setCustomFields,
  configure,
  userActive,
  mutate,
}) => {
  const { data: usersData } = useGetAll(`/users`, {
    select: (data) => {
      return data?.data?.data?.map((item) => ({
        label: item?.displayName + " (" + item?.mail + ")",
        value: item?.displayName + "," + item?.mail,
      }));
    },
  });

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
                {configure && (
                  <>
                    <td className="td" style={{ width: "350px" }}>
                      <SelectField
                        name="delegate_from"
                        options={usersData ? usersData : []}
                        onChange={(value) => {
                          setCustomFields((prev) =>
                            prev.map((i) =>
                              i.id === item.id
                                ? { ...i, delegate_from: value }
                                : i
                            )
                          );
                        }}
                      />{" "}
                    </td>
                  </>
                )}

                <td className="td" style={{ width: "350px" }}>
                  <SelectField
                    name="delegate_to"
                    options={usersData ? usersData : []}
                    onChange={(value) => {
                      setCustomFields((prev) =>
                        prev.map((i) =>
                          i.id === item.id ? { ...i, delegate_to: value } : i
                        )
                      );
                    }}
                    disable={customFields[0]?.isActive}
                    value={customFields && customFields[0]?.delegate_to}
                  />{" "}
                </td>
                {(configure || userActive) && (
                  <td className="td">
                    <div className="d-flex">
                      <button
                        type="submit"
                        onClick={() => configure && mutate(customFields[index])}
                        className="button-link me-2 m-0"
                      >
                        {customFields[0]?.isActive ? "Revoke" : "Delegate"}
                      </button>
                      {/* <p className="button-link m-0">Revoke</p> */}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          {/* {configure && (
            <div style={{ position: "absolute", right: 0, bottom: "-50px" }}>
              <button
                className="button-sec mt-1 me-0"
                type="button"
                onClick={() => {
                  setCustomFields((prev) => [
                    ...prev,
                    {
                      id: Date.now(),
                      no: "",
                      delegate_from: "",
                      delegate_to: "",
                      action: " ",
                    },
                  ]);
                }}
              >
                ADD MORE
              </button>
            </div>
          )} */}
        </table>
      </div>
    </>
  );
};

export default DelegateTable;
