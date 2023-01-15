import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import Comments from "../../../components/layout/Comments";
import NewModal from "../../../components/layout/modal/NewModal";
import RejectModal from "../../../components/layout/modal/RejectModal";
import serverAPI from "../../../config/serverAPI";
import errorHandle from "../../../utils/errorHandle";

const useRequestsPendingApproval = (user, refetchRequest) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const PostApprovedRequest = async (data) => {
    return await serverAPI.put("/request/approval", data);
  };

  const Mutation = useMutation(PostApprovedRequest, {
    onSuccess: (data) => {
      toast.success(data?.data?.msg);
      setSelectedRows([]);
      refetchRequest();
    },
    onError: (err) => {
      errorHandle(err);
    },
  });

  const columns = [
    {
      field: "request_number",
      headerName: "No.",
      headerAlign: "center",
      width: "150",
      cellClassName: "ps-3",
    },
    {
      field: "createdby_dn",
      headerName: "Requester",
      headerAlign: "center",
      width: "300",
      cellClassName: "ps-3",
    },
    {
      field: "start_date",
      headerName: "Start Date",
      headerAlign: "center",
      width: "150",
      cellClassName: "justify-content-center",
    },
    {
      field: "start_time",
      headerName: "Start Time",
      headerAlign: "center",
      width: "150",
      cellClassName: "justify-content-center",
    },
    {
      field: "end_date",
      headerName: "End Date",
      headerAlign: "center",
      width: "150",
      cellClassName: "justify-content-center",
    },
    {
      field: "end_time",
      headerName: "End Time",
      headerAlign: "center",
      width: "150",
      cellClassName: "justify-content-center",
    },
    {
      field: "amount",
      headerName: "Amount (CHF)",
      headerAlign: "center",
      width: "200",
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
      field: "image_url",
      headerName: "Ticket Image",
      headerAlign: "center",
      width: "200",
      cellClassName: "ps-3",
      renderCell: (params) => {
        return (
          <>
            <a
              href={`${
                process.env.REACT_APP_API_URL
              }${params.row.image_url?.slice(8)}`}
              target="_blank"
              rel="noreferrer"
            >
              {params.row.image_url?.slice(31)}
            </a>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      width: "200",
      cellClassName: "ps-3",
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-around"
            style={{ width: "100%" }}
          >
            <RejectModal
              name="Reject"
              selectedRow={params.row?.id}
              IsFinanceManager={user?.IsFinanceManager}
              mutate={Mutation.mutate}
              isLoading={Mutation.isLoading}
              title={`Reason for rejection of request no. ${params.row?.request_number}`}
            />
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
  return {
    columns,
    selectedRows,
    setSelectedRows,
    mutate: Mutation.mutate,
    isLoading: Mutation.isLoading,
  };
};

export default useRequestsPendingApproval;
