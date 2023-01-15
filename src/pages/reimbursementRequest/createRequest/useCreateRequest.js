import { useState } from "react";
import { useMutation } from "react-query";
import errorHandle from "../../../utils/errorHandle";
import { toast } from "react-toastify";
import serverAPI from "../../../config/serverAPI";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const useCreateRequest = () => {
  const navigate = useNavigate();
  const [customFields, setCustomFields] = useState([
    {
      id: Date.now(),
      no: "",
      start_date: "",
      start_time: "",
      end_date: "",
      end_time: "",
      amount: "",
      ticket: "",
    },
  ]);

  const PostRequest = async (data) => {
    let Data = {
      start_date: [],
      end_date: [],
      start_time: [],
      end_time: [],
      amount: [],
      images: [],
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
        throw new Error(
          `End Date & Time cannot be less than Start Date & Time!`
        );
      }
      Data.start_date.push(moment(item.start_date).format("YYYY/MM/DD"));
      Data.end_date.push(moment(item.end_date).format("YYYY/MM/DD"));
      Data.start_time.push(moment(item.start_time).format("H:mm"));
      Data.end_time.push(moment(item.end_time).format("H:mm"));
      Data.amount.push(item.amount);
      Data.images.push(item.ticket);
    });
    const formData = new FormData();
    for (let i = 0; i < Data.start_date.length; i++) {
      formData.append("start_date[]", Data.start_date[i]);
      formData.append("end_date[]", Data.end_date[i]);
      formData.append("start_time[]", Data.start_time[i]);
      formData.append("end_time[]", Data.end_time[i]);
      formData.append("amount[]", Data.amount[i]);
      formData.append("images[]", Data.images[i]);
    }

    return await serverAPI.post("/request", formData);
  };

  const Mutation = useMutation(PostRequest, {
    onSuccess: (data) => {
      toast.success(data?.data?.msg);
      setCustomFields([
        {
          id: Date.now(),
          no: "",
          start_date: new Date(),
          start_time: new Date(),
          end_date: new Date(),
          end_time: new Date(),
          amount: "",
          ticket: "",
        },
      ]);
      navigate("/reimbursement-request/open-requests");
    },
    onError: (err) => {
      errorHandle(err);
    },
  });

  const columns = [
    {
      field: "no",
      headerName: "No",
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
        width: "250px",
      },
    },
    {
      field: "ticket",
      headerName: "Ticket Image",
      styles: {
        width: "300px",
      },
    },
    {
      field: "action",
      headerName: "Action",
      styles: {
        width: "150px",
      },
    },
  ];
  return {
    columns,
    customFields,
    setCustomFields,
    mutate: Mutation.mutate,
    isLoading: Mutation.isLoading,
  };
};

export default useCreateRequest;
