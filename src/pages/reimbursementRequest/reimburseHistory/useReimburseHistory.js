import { Tooltip } from "@mui/material";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import CommonContext from "../../../context/commonContext/CommonContext";
import useGetAll from "../../../hooks/useGetAll";

const useReimburseHistory = (dates) => {
  const { rowsState, setRowsState, query, clearRowState } =
    useContext(CommonContext);
  const [search, setSearch] = useState("");

  const {
    data,
    refetch: refetchRequest,
    isFetching: RequestLoading,
  } = useGetAll(
    `/request/reimbursehistory?${query}${
      search ? `&key=${search.trim().replaceAll(" ", "-")}` : ""
    }${dates ? dates : ""}`,
    {
      enabled: false,
    }
  );

  useEffect(() => {
    return () => {
      clearRowState();
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    refetchRequest();
    //eslint-disable-next-line
  }, [rowsState?.page, rowsState?.pageSize]);

  const columns = [
    {
      field: "createdby_name",
      headerName: "Reimbursed By",
      headerAlign: "center",
      width: "250",
      cellClassName: "ps-3",
    },
    {
      field: "createdby_dn",
      headerName: "Email",
      headerAlign: "center",
      width: "300",
      cellClassName: "ps-3",
    },
    {
      field: "created_at",
      headerName: "Reimbursed At",
      headerAlign: "center",
      width: "250",
      cellClassName: "ps-3",
      renderCell: (params) =>
        moment(params?.row?.created_at)?.format("DD MMM YYYY  HH:mm"),
    },
    {
      field: "file_name",
      headerName: "File Name",
      headerAlign: "center",
      width: "350",
      cellClassName: "ps-3",
      renderCell: (params) => {
        return (
          <Tooltip title={params.row?.file_name}>
            <div>{params.row?.file_name}</div>
          </Tooltip>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      width: "200",
      cellClassName: "d-flex justify-content-center align-items-center",
      renderCell: (params) => {
        return (
          <a
            href={`${
              process.env.REACT_APP_API_URL
            }${params?.row?.file_path?.slice(8)}`}
            download
          >
            Download
          </a>
        );
      },
    },
  ];

  return {
    search,
    setSearch,
    rowsState,
    setRowsState,
    data,
    refetchRequest,
    RequestLoading,
    columns,
  };
};

export default useReimburseHistory;
