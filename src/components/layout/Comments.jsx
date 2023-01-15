import moment from "moment";
import React from "react";
import "../../hooks/useGetAll";
import useGetAll from "../../hooks/useGetAll";

const Comments = ({ id }) => {
  const { data } = useGetAll(`/request/comments/${id}`, {
    select: (data) => data?.data?.data,
  });

  return (
    <div className="d-flex flex-column py-2">
      <div className="comment-data d-flex flex-column ms-3">
        {data?.ApprovalLogs &&
          data?.ApprovalLogs?.map((item) => {
            if (item?.comment) {
              return (
                <p key={item?.created_at}>
                  {" "}
                  <span style={{ fontWeight: "600" }}>
                    {item?.approvedby_dn}
                  </span>
                  : {item?.comment} |{" "}
                  {moment(item?.created_at).format("DD/MM/YYYY")} -{" "}
                  {moment(item?.created_at).format("HH:mm")}
                </p>
              );
            } else return null;
          })}
      </div>
    </div>
  );
};

export default Comments;
