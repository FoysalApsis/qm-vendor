import React, { useRef } from "react";

const CameraCapture = ({ imgURL, setImgURL, onChange }) => {
  const ref = useRef();
  const focusInput = () => {
    ref.current?.click();
  };

  return (
    <>
      <input
        type="file"
        hidden
        ref={ref}
        accept="image/*"
        onChange={(e) => {
          onChange(e);
          var reader = new FileReader();
          reader.onload = function () {
            var dataURL = reader.result;
            setImgURL(dataURL);
          };
          reader.readAsDataURL(e.target.files[0]);
        }}
        capture="environment"
      ></input>
      <span
        className="button-link"
        style={{
          cursor: "pointer",
        }}
        onClick={focusInput}
      >
        {imgURL ? "Retake Image" : "Capture Image"}
      </span>{" "}
    </>
  );
};

export default CameraCapture;
