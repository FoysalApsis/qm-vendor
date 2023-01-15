import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import commonContext from "../../context/commonContext/CommonContext";
import useGetAll from "../../hooks/useGetAll";

const useRequests = (newQuery, documentType) => {
  const { rowsState, setRowsState, query, clearRowState } =
    useContext(commonContext);
  const [search, setSearch] = useState("");
  const [requestData, setRequestData] = useState([]);
  const ref = useRef(null);
  const excelRef = useRef(null);

  const {
    data: request_data,
    refetch: refetchRequest,
    isLoading: RequestLoading,
  } = useGetAll(
    `/request/all?${query}${newQuery ? "&" + newQuery : ""}${
      search ? `&key=${search.trim().replaceAll(" ", "-")}` : ""
    }`,
    {
      select: (data) => {
        return {
          data: data?.data?.data?.map((item) => ({
            ...item,
            start_date: moment(item?.start_date).format("DD MMM YYYY"),
            end_date: moment(item?.end_date).format("DD MMM YYYY"),
            start_time: moment(item?.start_time).utc().format("HH:mm"),
            end_time: moment(item?.end_time).utc().format("HH:mm"),
            created_at: moment(item?.created_at).format("DD MMM YYYY"),
            updated_at: moment(item?.updated_at).format("DD MMM YYYY"),
          })),
          total: data?.data?.total,
        };
      },
    }
  );

  useEffect(() => {
    if (request_data) {
      setRequestData(request_data.data);
      setRowsState({ ...rowsState, total: request_data.total });
    }

    //eslint-disable-next-line
  }, [request_data]);

  useEffect(() => {
    return () => {
      clearRowState();
    };
    //eslint-disable-next-line
  }, []);

  const {
    data: pdfData,
    refetch: fetchPdf,
    isFetching: pdfLoading,
  } = useGetAll(
    `/request/PdforExcel?${newQuery ? "&" + newQuery : ""}${
      search ? `&key=${search.trim().replaceAll(" ", "-")}` : ""
    }${
      documentType ? `&${documentType.trim().replaceAll(" ", "-")}` : ""
    }&download_type=pdf`,
    {
      enabled: false,
      onSuccess: () => {
        setTimeout(() => {
          ref.current.click();
        }, 100);
      },
    }
  );

  const {
    data: excelData,
    refetch: fetchExcel,
    isFetching: excelLoading,
  } = useGetAll(
    `/request/PdforExcel?${newQuery ? "&" + newQuery : ""}${
      search ? `&key=${search.trim().replaceAll(" ", "-")}` : ""
    }${
      documentType ? `&${documentType.trim().replaceAll(" ", "-")}` : ""
    }&download_type=excel`,
    {
      enabled: false,
      onSuccess: () => {
        setTimeout(() => {
          excelRef.current.click();
        }, 100);
      },
    }
  );

  return {
    search,
    setSearch,
    rowsState,
    setRowsState,
    data: requestData,
    refetchRequest,
    RequestLoading,
    pdfData: pdfData && `${process.env.REACT_APP_API_URL}${pdfData?.slice(8)}`,
    excelData:
      excelData && `${process.env.REACT_APP_API_URL}${excelData?.slice(8)}`,
    fetchPdf,
    fetchExcel,
    pdfLoading,
    excelLoading,
    ref,
    excelRef,
  };
};

export default useRequests;
