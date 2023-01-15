import moment from "moment";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import serverAPI from "../../../../config/serverAPI";
import useGetAll from "../../../../hooks/useGetAll";
import errorHandle from "../../../../utils/errorHandle";

const useResubmit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const [customFields, setCustomFields] = useState([]);
  const { data, isLoading: auditLoading } = useGetAll(`/request/${id}`, {
    select: (data) => data?.data?.data,
  });

  useEffect(() => {
    if (data) {
      setCustomFields([
        {
          id: Date.now(),
          no: data?.request_number,
          start_date: new Date(data?.start_date),
          // start_time: moment(data?.start_time).utc().format("YYYY-MM-DD HH:mm"),
          start_time: new Date(
            moment(data?.start_time).utc().format("YYYY-MM-DD HH:mm")
          ),
          // start_time: data?.start_time,
          end_date: new Date(data?.end_date),
          end_time: new Date(
            moment(data?.end_time).utc().format("YYYY-MM-DD HH:mm")
          ),
          // end_time: moment(data?.end_time).utc().format("YYYY-MM-DD HH:mm"),
          amount: data?.amount,
          ticket: data?.image_url,
        },
      ]);
    }
  }, [data]);

  const PutRequest = async (data) => {
    let Data = {
      start_date: [],
      end_date: [],
      start_time: [],
      end_time: [],
      amount: [],
      images: [],
      comment: [],
    };

    data?.forEach((item) => {
      if (
        !item.start_date ||
        !item.end_date ||
        !item.start_time ||
        !item.end_time ||
        !item.amount ||
        !item.ticket
      ) {
        throw new Error(`Please fill all the fields`);
      }
      let d1 = item.start_date?.getTime() + item.start_time?.getTime();
      let d2 = item.end_date?.getTime() + item.end_time?.getTime();
      if (d2 < d1) {
        throw new Error(`End Date  cannot be less than Start Date!`);
      }
      Data.start_date.push(moment(item.start_date).format("YYYY/MM/DD"));
      Data.end_date.push(moment(item.end_date).format("YYYY/MM/DD"));
      Data.start_time.push(moment(item.start_time).format("H:mm"));
      Data.end_time.push(moment(item.end_time).format("H:mm"));
      Data.amount.push(item.amount);
      Data.images.push(item.ticket);
      Data.comment.push(item.comment);
    });
    const formData = new FormData();
    for (let i = 0; i < Data.start_date.length; i++) {
      formData.append("start_date[]", Data.start_date[i]);
      formData.append("end_date[]", Data.end_date[i]);
      formData.append("start_time", Data.start_time[i]);
      formData.append("end_time", Data.end_time[i]);
      formData.append("amount", Data.amount[i]);
      if (Data.images[i] && typeof Data.images[i] !== "string") {
        formData.append("images[]", Data.images[i]);
      }
      formData.append("comment", Data.comment[i]);
    }

    return await serverAPI.put(`/request/${id}`, formData);
  };

  const Mutation = useMutation(PutRequest, {
    onSuccess: (data) => {
      toast.success(data?.data?.msg);
      setCustomFields([]);
      navigate("/reimbursement-request/open-requests");
    },
    onError: (err) => {
      errorHandle(err);
    },
  });

  const columns = [
    {
      field: "request_number",
      headerName: "No.",
      styles: {
        width: "150px",
      },
    },
    {
      field: "start_date",
      headerName: "Start Date",
      styles: {
        width: "250px",
      },
    },

    {
      field: "start_time",
      headerName: "Start Time",
      styles: {
        width: "250px",
      },
    },
    {
      field: "end_date",
      headerName: "End Date",
      styles: {
        width: "250px",
      },
    },
    {
      field: "end_time",
      headerName: "End Time",
      styles: {
        width: "250px",
      },
    },
    {
      field: "amount",
      headerName: "Amount (CHF)",
      styles: {
        width: "350px",
      },
    },
    {
      field: "ticket",
      headerName: "Ticket Image",
      styles: {
        width: "350px",
      },
    },
  ];
  return {
    columns,
    customFields,
    setCustomFields,
    mutate: Mutation.mutate,
    isLoading: Mutation.isLoading,
    data,
    auditLoading,
  };
};

export default useResubmit;
