import React from "react";
import Comments from "../../../components/layout/Comments";
import NewModal from "../../../components/layout/modal/NewModal";

const useRequestsSentForApproval = () => {
  const columns = [
    {
      field: "request_number",
      headerName: "No.",
      headerAlign: "center",
      width: "150",
      cellClassName: "ps-3",
    },
    {
      field: "Status.name",
      headerName: "Status",
      headerAlign: "center",
      width: "250",
      cellClassName: "ps-3",
    },
    {
      field: "created_at",
      headerName: "Issue Date",
      headerAlign: "center",
      width: "150",
      cellClassName: "justify-content-center",
    },
    {
      field: "amount",
      headerName: "Amount (CHF)",
      headerAlign: "center",
      width: "140",
      cellClassName: "justify-content-end",
      renderCell: (params) => {
        return (
          <>
            <p className="m-0">{params?.row?.amount?.toFixed(2)}</p>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      width: "150",
      cellClassName: "ps-3",
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-around"
            style={{ width: "100%" }}
          >
            {params.row.Count > 0 && (
              <NewModal
                title={`Comments for ${params?.row?.request_number}`}
                hideFooter
                modalLarge
                linkButton
                name="Comments"
              >
                <Comments id={params.row.id} />
              </NewModal>
            )}
          </div>
        );
      },
    },
  ];
  return { columns };
};

export default useRequestsSentForApproval;
