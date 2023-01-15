import { useField } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";

const FileInput = ({
  name,
  fileList,
  disable,
  deleteFile,
  deleteFileLoading,
  onChange,
  handleDelete,
  value,
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const [imageURL, setImageURL] = useState(null);

  const configFileInputfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  };

  if (meta && meta.touched && meta.error) {
    configFileInputfield.error = true;
    configFileInputfield.helperText = meta.error;
  }

  const ref = useRef();

  const focusInput = () => {
    ref.current?.click();
  };

  useEffect(() => {
    if (typeof value === "string") {
      setImageURL(`${process.env.REACT_APP_API_URL}${value?.slice(8)}`);
    }
  }, [value]);

  return (
    <>
      {!disable && (
        <div className="d-flex justify-content-between ">
          <>
            {value ? (
              <a href={imageURL} target="_blank" rel="noreferrer">
                {typeof value === "string" ? value?.slice(31) : value?.name}
              </a>
            ) : (
              "Upload image"
            )}
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Control
                onChange={(e) => {
                  let [file] = e.target.files;
                  setImageURL(URL.createObjectURL(file));
                  onChange(e);
                }}
                ref={ref}
                type="file"
                size="sm"
                hidden
                // multiple
                name={name}
              />
            </Form.Group>
          </>
          <div className="d-flex justify-content-end">
            <i
              className="material-icons-outlined align-self-sm-center"
              style={{
                color: "#c2c2c2",
                cursor: "pointer",
              }}
              onClick={focusInput}
            >
              upload
            </i>
            {(value || value?.name) && (
              <i
                className="material-icons-outlined align-self-sm-center"
                style={{
                  color: "#c2c2c2",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleDelete();
                  ref.current.value = null;
                }}
              >
                delete
              </i>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FileInput;
