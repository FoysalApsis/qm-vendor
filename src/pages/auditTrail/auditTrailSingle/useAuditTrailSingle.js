import { useRef } from "react";
import { useParams } from "react-router-dom";
import useGetAll from "../../../hooks/useGetAll";

const useAuditTrail = (query) => {
  const params = useParams();
  const ref = useRef(null);
  const id = params.id;
  const { data: audit_data, isLoading } = useGetAll(
    `/request/audittrials/${id}?${query ? query : ""}`
  );

  const {
    data: pdfData,
    refetch: fetchPdf,
    isFetching,
  } = useGetAll(`/request/audittrialpdf/${id}?${query ? query : ""}`, {
    enabled: false,
    onSuccess: () => {
      setTimeout(() => {
        ref.current.click();
      }, 100);
    },
  });

  return {
    audit_data,
    isLoading,
    pdfData: pdfData && `${process.env.REACT_APP_API_URL}${pdfData?.slice(8)}`,
    fetchPdf,
    isFetching,
    ref,
  };
};

export default useAuditTrail;
