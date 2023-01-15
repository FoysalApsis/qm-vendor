import { ErrorMessage, Field } from "formik";
import React from "react";
import "./MobileCreateReqForm.scss";
import CameraCapture from "../../formsUI/CameraCapture";
import moment from "moment";
import DateInput from "../../formsUI/DateInput";
import TimeInput from "../../formsUI/TimeInput";

const MobileCreateReqForm = ({
  customFields,
  setCustomFields,
  imgURL,
  setImgURL,
  updateTable,
  commentData,
}) => {
  const fieldStyles = {
    background: "rgba(255, 255, 255, 0.9)",
    border: "1px solid #000",
    padding: "4px 8px",
    height: "40px",
    width: "100%",
    color: "rgba(0, 0, 0, 0.67)",
    fontWeight: "300",
  };

  return (
    <>
      {customFields.map((item) => (
        <div key={item?.id} className="d-flex flex-column px-2 mt-4">
          <div className="d-flex flex-column align-items-center mb-4">
            <p className="mb-3">Capture ticket picture</p>
            {imgURL && (
              <img
                src={imgURL}
                alt="ticket"
                className="mb-4 rounded border"
                height="140px"
                width="140px"
              />
            )}
            <CameraCapture
              imgURL={imgURL}
              setImgURL={setImgURL}
              onChange={(e) => {
                setCustomFields((prev) =>
                  prev.map((i) =>
                    i.id === item.id ? { ...i, ticket: e.target.files[0] } : i
                  )
                );
              }}
            />
          </div>
          <p>Amount :</p>
          <Field
            name="amount"
            type={"number"}
            className="mb-4"
            value={item?.amount}
            style={{
              ...fieldStyles,
            }}
            onChange={(e) => {
              setCustomFields((prev) =>
                prev.map((i) =>
                  i.id === item.id
                    ? { ...i, [e.target.name]: e.target.value }
                    : i
                )
              );
            }}
            placeholder="Amount"
          />
          <p>Start Date :</p>
          <DateInput
            name="start_date"
            className="mb-4"
            mobile
            value={item?.start_date}
            style={{
              ...fieldStyles,
            }}
            setValue={(e) => {
              setCustomFields((prev) =>
                prev.map((i) =>
                  i.id === item.id ? { ...i, start_date: e } : i
                )
              );
            }}
          />
          {/* <Field
            name="start_date"
            type={"date"}
            className="mb-4"
            value={moment(item?.start_date).format("YYYY-MM-DD")}
            style={{
              ...fieldStyles,
            }}
            onChange={(e) => {
              setCustomFields((prev) =>
                prev.map((i) =>
                  i.id === item.id ? { ...i, start_date: e.target.value } : i
                )
              );
            }}
            placeholder="start date"
          /> */}
          <p>Start Time :</p>
          <TimeInput
            name="start_time"
            mobile
            value={item.start_time}
            className="mb-4"
            style={{
              ...fieldStyles,
            }}
            setValue={(value) => {
              setCustomFields((prev) =>
                prev.map((i) =>
                  i.id === item.id ? { ...i, start_time: value } : i
                )
              );
            }}
            variant="standard"
          />
          {/* <Field
            name="start_time"
            type={"time"}
            className="mb-4"
            style={{
              ...fieldStyles,
            }}
            value={
              item?.start_time?.length < 6
                ? item?.start_time
                : moment(item?.start_time).format("HH:mm")
            }
            onChange={(e) => {
              setCustomFields((prev) =>
                prev.map((i) =>
                  i.id === item.id ? { ...i, start_time: e.target.value } : i
                )
              );
            }}
            placeholder="start time"
          /> */}
          <p>End Date :</p>
          {/* <Field
            name="end_date"
            type={"date"}
            className="mb-4"
            style={{
              ...fieldStyles,
            }}
            value={moment(item?.end_date).format("YYYY-MM-DD")}
            onChange={(e) => {
              setCustomFields((prev) =>
                prev.map((i) =>
                  i.id === item.id ? { ...i, end_date: e.target.value } : i
                )
              );
            }}
            placeholder="end date"
          /> */}
          <DateInput
            name="end_date"
            className="mb-4"
            mobile
            value={item?.end_date}
            style={{
              ...fieldStyles,
            }}
            setValue={(e) => {
              setCustomFields((prev) =>
                prev.map((i) => (i.id === item.id ? { ...i, end_date: e } : i))
              );
            }}
          />
          <p>End Time :</p>
          <TimeInput
            name="end_time"
            mobile
            value={item.end_time}
            className="mb-4"
            style={{
              ...fieldStyles,
            }}
            setValue={(value) => {
              setCustomFields((prev) =>
                prev.map((i) =>
                  i.id === item.id ? { ...i, end_time: value } : i
                )
              );
            }}
            variant="standard"
          />
          {/* <Field
            name="end_time"
            type={"time"}
            className="mb-4"
            style={{
              ...fieldStyles,
            }}
            value={
              item?.end_time?.length < 6
                ? item?.end_time
                : moment(item?.end_time).format("HH:mm")
            }
            onChange={(e) => {
              setCustomFields((prev) =>
                prev.map((i) =>
                  i.id === item.id ? { ...i, end_time: e.target.value } : i
                )
              );
            }}
            placeholder="end time"
          /> */}
          {updateTable && (
            <>
              <p>
                Comment<span style={{ color: "red" }}>*</span> :
              </p>
              <Field
                name="comment"
                type={"text"}
                style={{
                  ...fieldStyles,
                }}
                placeholder="Comment"
              />
              <ErrorMessage
                name="comment"
                render={(msg) => (
                  <div
                    style={{
                      color: "red",
                      marginBottom: "5px",
                    }}
                  >
                    {msg}
                  </div>
                )}
              />

              <div className="mt-5 border-top d-flex flex-column py-2">
                <p>Comments:</p>
                <div className="d-flex flex-column ms-3">
                  {commentData?.map((item) => (
                    <p key={item?.created_at}>
                      {" "}
                      <span style={{ fontWeight: "600" }}>
                        {item?.approvedby_dn}
                      </span>
                      : {item?.comment} |{" "}
                      {moment(item?.created_at).format("DD/MM/YYYY")} -{" "}
                      {moment(item?.created_at).format("HH:mm")}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      ))}
      <div className="mobile-footer">
        <button type="button" className="button-mobile">
          CANCEL
        </button>
        <button type="submit" className="button-mobile">
          SUBMIT
        </button>
      </div>
    </>
  );
};

export default MobileCreateReqForm;
