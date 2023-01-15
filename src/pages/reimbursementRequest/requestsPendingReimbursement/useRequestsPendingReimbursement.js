import { useContext, useEffect, useRef, useState } from "react";
import CommonContext from "../../../context/commonContext/CommonContext";
import useGetAll from "../../../hooks/useGetAll";

const useRequestsPendingReimbursement = (dates) => {
  const { rowsState, setRowsState, query, clearRowState } =
    useContext(CommonContext);
  const [requestData, setRequestData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [search, setSearch] = useState("");
  const excelRef = useRef(null);

  const {
    data,
    refetch: refetchRequest,
    isFetching: RequestLoading,
  } = useGetAll(
    `/request/forfinalreimbursment?${query}${
      search ? `&key=${search.trim().replaceAll(" ", "-")}` : ""
    }${dates ? dates : ""}`,
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (data) {
      let obj = [];
      data?.reimbursed_data?.map((item) => {
        return obj.push({ ...item, id: Math.random() * Date.now() });
      });
      setRequestData(obj);
      let temp = [];
      data?.headers?.map((item) => {
        return item === "WRBTR"
          ? temp.push({
              field: item,
              headerName: item,
              headerAlign: "center",
              width: "150",
              cellClassName: "justify-content-end",
              renderCell: (params) =>
                params?.row?.WRBTR ? params?.row?.WRBTR?.toFixed(2) : "-",
            })
          : temp.push({
              field: item,
              headerName: item,
              headerAlign: "center",
              width: item === "KKPO" || item === "SGTXT" ? "300" : "150",
              cellClassName:
                item === "KKPO" || item === "SGTXT"
                  ? "ps-3"
                  : "justify-content-center",
            });
      });
      setColumns(temp);
    }

    return () => {
      clearRowState();
    };
    //eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    refetchRequest();
    //eslint-disable-next-line
  }, [rowsState?.page, rowsState?.pageSize]);

  const {
    data: excelData,
    refetch: fetchExcel,
    isFetching: excelLoading,
  } = useGetAll(`/request/excelforreimbursment?${dates ? dates : ""}`, {
    enabled: false,
    onSuccess: () => {
      setTimeout(() => {
        refetchRequest();
        excelRef.current.click();
      }, 100);
    },
  });

  return {
    search,
    setSearch,
    rowsState,
    setRowsState,
    data: requestData,
    refetchRequest,
    RequestLoading,
    requestData,
    columns,
    excelData:
      excelData && `${process.env.REACT_APP_API_URL}${excelData?.slice(8)}`,
    fetchExcel,
    excelLoading,
    excelRef,
  };
};

export default useRequestsPendingReimbursement;
