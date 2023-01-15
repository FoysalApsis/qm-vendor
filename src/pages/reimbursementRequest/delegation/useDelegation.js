import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import serverAPI from "../../../config/serverAPI";
import CommonContext from "../../../context/commonContext/CommonContext";
import useGetAll from "../../../hooks/useGetAll";
import errorHandle from "../../../utils/errorHandle";

const useDelegation = (newQuery, newQuery2) => {
  const { rowsState, setRowsState, query, clearRowState } =
    useContext(CommonContext);
  const [searchPrev, setSearchPrev] = useState("");

  const [customFields, setCustomFields] = useState([
    {
      id: Date.now(),
      delegate_to: "",
      action: " ",
      isActive: false,
    },
  ]);

  const { data, refetch } = useGetAll(
    `/users/delegation?${query}${newQuery ? "&" + newQuery : ""}`,
    {
      select: (data) => {
        return data?.data?.data?.map((item) => ({
          ...item,
          created_at: moment(item?.created_at).format("DD MMM YYYY"),
          updated_at: moment(item?.updated_at).format("DD MMM YYYY"),
        }));
      },
    }
  );

  const {
    data: dataPrev,
    isLoading: isLoadingPrev,
    refetch: refetchPrev,
  } = useGetAll(
    `/users/delegation?${query}${newQuery2 ? "&" + newQuery2 : ""}${
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
      setRowsState({ ...rowsState, total: dataPrev?.total });
    }

    //eslint-disable-next-line
  }, [dataPrev]);

  useEffect(() => {
    return () => {
      clearRowState();
    };
    //eslint-disable-next-line
  }, []);

  const PostDelegation = async (data) => {
    if (!data?.delegate_to?.value) {
      throw new Error("Please select a user to delegate!");
    }
    let postData = {
      from_user: data?.from_user,
      to_user: data?.delegate_to?.value,
      isActive: true,
    };
    let putData = {
      id: data?.id,
      from_user: data?.from_user,
      to_user: data?.delegate_to?.value,
    };

    if (!data?.isActive) {
      return await serverAPI.post("/users/delegation", postData);
    } else {
      return await serverAPI.put("/users/delegation", putData);
    }
  };

  const Mutation = useMutation(PostDelegation, {
    onSuccess: (data) => {
      toast.success(data?.data?.msg);
      refetch();
      refetchPrev();
      setCustomFields([
        {
          id: Date.now(),
          delegate_to: "",
          action: " ",
          isActive: false,
        },
      ]);
    },
    onError: (err) => {
      errorHandle(err);
    },
  });

  const columns = [
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
      renderCell: (params) => {
        return (
          <>
            <button>Delegate</button>
          </>
        );
      },
    },
  ];

  const columnsPrev = [
    {
      field: "to_user_email",
      headerName: "Delegated to",
      headerAlign: "center",
      width: "350",
      cellClassName: "ps-3",
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
    columnsPrev,
    rowsState,
    setRowsState,
    data,
    mutate: Mutation.mutate,
    searchPrev,
    setSearchPrev,
    dataPrev: dataPrev?.data,
    isLoadingPrev,
  };
};

export default useDelegation;
