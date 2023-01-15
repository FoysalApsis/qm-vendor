import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import serverAPI from "../../../config/serverAPI";
import useGetAll from "../../../hooks/useGetAll";
import errorHandle from "../../../utils/errorHandle";

const useSAPReporting = () => {
  const [customFields, setCustomFields] = useState([]);

  const { isLoading, refetch } = useGetAll(`/users/sap_reporting_configs`, {
    select: (data) => data?.data?.data,
    onSuccess: (data) => {
      let tempArray = [];
      data?.map((item) =>
        tempArray.push({
          id: item?.id,
          field: item?.field,
          sap_field_name: item?.sap_field_name,
          value: item?.value,
          calculated: item?.calculated,
        })
      );
      setCustomFields(tempArray);
    },
  });
  const PutSAP = async (data) => {
    await serverAPI.put(`/users/sap_reporting_configs`, data);
  };

  const Mutation = useMutation(PutSAP, {
    onSuccess: async (data) => {
      toast.success(data?.data?.msg);
      refetch();
    },
    onError: (err) => {
      errorHandle(err);
    },
  });

  return {
    customFields,
    isLoading,
    mutate: Mutation.mutate,
    UpdateLoading: Mutation.isLoading,
  };
};

export default useSAPReporting;
