import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { useRef } from "react";

const DateInput = ({
  name,
  value,
  setValue,
  onlyMonth,
  mobile,
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const configTextfield = {
    ...field,
    ...otherProps,
    variant: "standard",
  };

  const { setFieldValue } = useFormikContext();

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  const styles = {
    background: "#fff",
    "& .css-1ptx2yq-MuiInputBase-root-MuiInput-root:before": {
      content: "none",
    },
    "& .css-1ptx2yq-MuiInputBase-root-MuiInput-root.Mui-error:after": {
      content: "none",
    },
    "& .css-1ptx2yq-MuiInputBase-root-MuiInput-root:after": {
      content: "none",
    },
  };

  const inputRef = useRef(null);
  console.log(inputRef);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        disableFuture
        label=""
        openTo={onlyMonth ? "month" : "day"}
        size="small"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          setFieldValue(name, newValue);
        }}
        views={onlyMonth ? ["year", "month"] : ["year", "month", "day"]}
        renderInput={(params) => (
          <TextField
            sx={mobile && { ...styles }}
            {...configTextfield}
            variant="standard"
            inputRef={inputRef}
            {...params}
            inputProps={{
              ...params.inputProps,
              placeholder: onlyMonth ? "mm/yyyy" : "dd/mm/yyyy",
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
