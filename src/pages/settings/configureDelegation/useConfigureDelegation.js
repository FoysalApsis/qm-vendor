import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { QueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";
import serverAPI from "../../../config/serverAPI";
import CommonContext from "../../../context/commonContext/CommonContext";
import useGetAll from "../../../hooks/useGetAll";
import errorHandle from "../../../utils/errorHandle";

const useConfigureDelegation = (newQuery, newQuery2) => {
  const {
    rowsState,
    setRowsState,
    query,
    clearRowState,
    rowsStatePrev,
    setRowsStatePrev,
    queryPrev,
    clearRowStatePrev,
  } = useContext(CommonContext);
  const [search, setSearch] = useState("");
  const [searchPrev, setSearchPrev] = useState("");
  const queryClient = new QueryClient();

  const [customFields, setCustomFields] = useState([
    {
      id: Date.now(),
      delegate_from: "",
      delegate_to: "",
      action: " ",
    },
  ]);

  const { data, isLoading, refetch } = useGetAll(
    `/users/delegation?${query}${newQuery ? "&" + newQuery : ""}${
      search ? `&key=${search.trim().replaceAll(" ", "-")}` : ""
    }`,
    {
      select: (data) => {
        return {
          data: data?.data?.data?.map((item) => ({
            ...item,
            created_at: moment(item?.created_at).format("DD MMM YYYY"),
            updated_at: moment(item?.updated_at).format("DD MMM YYYY"),
          })),
          total: data?.data?.total,
        };
      },
    }
  );

  useEffect(() => {
    if (data) {
      setRowsState({ ...rowsState, total: data?.total });
    }

    //eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    return () => {
      clearRowState();
    };
    //eslint-disable-next-line
  }, []);

  const {
    data: dataPrev,
    isLoading: isLoadingPrev,
    refetch: refetchPrev,
  } = useGetAll(
    `/users/delegation?${queryPrev}${newQuery2 ? "&" + newQuery2 : ""}${
      searchPrev ? `&key=${searchPrev.trim().replaceAll(" ", "-")}` : ""
    }`,
    {
      select: (data) => {
        return {
          data: data?.data?.data?.map((item) => ({
            ...item,
            created_at: moment(item?.created_at).format("DD MMM YYYY"),
            updated_at: moment(item?.updated_at).format("DD MMM YYYY"),
          })),
          total: data?.data?.total,
        };
      },
    }
  );

  useEffect(() => {
    if (dataPrev) {
      setRowsStatePrev({ ...rowsStatePrev, total: dataPrev.total });
    }
    return () => {
      clearRowStatePrev();
    };
    //eslint-disable-next-line
  }, [dataPrev]);

  const PostDelegation = async (data) => {
    if (!data?.delegate_to?.value) {
      throw new Error("Please select users for delegation!");
    }
    let postData = {
      from_user: data?.delegate_from?.value,
      to_user: data?.delegate_to?.value,
      isActive: true,
    };
    return await serverAPI.post("/users/delegation", postData);
  };

  const Mutation = useMutation(PostDelegation, {
    onSuccess: async (data) => {
      toast.success(data?.data?.msg);
      refetch();
      await queryClient.refetchQueries(
        ["/users/delegation?limit=15&page=0&type=previous_multiple"],
        { stale: true }
      );
      setCustomFields([
        {
          id: Date.now(),
          delegate_from: "",
          delegate_to: "",
          action: " ",
        },
      ]);
    },
    onError: (err) => {
      errorHandle(err);
    },
  });

  const RevokeDelegation = async (data) => {
    return await serverAPI.put("/users/delegation", data);
  };

  const RevokeMutation = useMutation(RevokeDelegation, {
    onSuccess: (data) => {
      toast.success(data?.data?.msg);
      refetch();
      refetchPrev();
    },
    onError: (err) => {
      errorHandle(err);
    },
  });

  const columns = [
    {
      field: "delegate_from",
      headerName: "Delegate from",
      style: {
        width: "250px",
      },
    },
    {
      field: "delegate_to",
      headerName: "Delegate to",
      style: {
        width: "250px",
      },
    },
    {
      field: "action",
      headerName: "Action",
      style: {
        width: "200px",
      },
    },
  ];

  const columnsActive = [
    {
      field: "id",
      headerName: "No.",
      headerAlign: "center",
      width: "150",
      cellClassName: "justify-content-center",
    },
    {
      field: "from_user_email",
      headerName: "Delegate from",
      headerAlign: "center",
      width: "300",
      cellClassName: "justify-content-center",
    },
    {
      field: "to_user_email",
      headerName: "Delegate to",
      headerAlign: "center",
      width: "300",
      cellClassName: "justify-content-center",
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      width: "300",
      cellClassName: "justify-content-center",
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() =>
                RevokeMutation.mutate({
                  id: params?.row?.id,
                  from_user:
                    params?.row?.from_user_dn +
                    "," +
                    params?.row?.from_user_email,
                  to_user:
                    params?.row?.to_user_dn + "," + params?.row?.to_user_email,
                })
              }
              className="button-link"
            >
              Revoke
            </button>
          </>
        );
      },
    },
  ];

  const columnsPrev = [
    {
      field: "id",
      headerName: "No.",
      headerAlign: "center",
      width: "150",
      cellClassName: "justify-content-center",
    },
    {
      field: "from_user_email",
      headerName: "Delegated from",
      headerAlign: "center",
      width: "300",
      cellClassName: "justify-content-center",
    },
    {
      field: "to_user_email",
      headerName: "Delegated to",
      headerAlign: "center",
      width: "300",
      cellClassName: "justify-content-center",
    },
    {
      field: "created_at",
      headerName: "Delegated On",
      headerAlign: "center",
      width: "200",
      cellClassName: "justify-content-center",
    },
    {
      field: "updated_at",
      headerName: "Revoked On",
      headerAlign: "center",
      width: "200",
      cellClassName: "justify-content-center",
    },
  ];
  return {
    columns,
    customFields,
    setCustomFields,
    columnsActive,
    columnsPrev,
    search,
    setSearch,
    data: data?.data,
    isLoading,
    rowsState,
    setRowsState,
    rowsStatePrev,
    setRowsStatePrev,
    mutate: Mutation.mutate,
    searchPrev,
    setSearchPrev,
    dataPrev: dataPrev?.data,
    isLoadingPrev,
  };
};

export default useConfigureDelegation;
