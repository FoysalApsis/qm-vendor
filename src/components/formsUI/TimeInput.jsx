import React from "react";
import { LocalizationProvider, TimePicker } from "@mui/lab";
import bgLocale from "date-fns/locale/bg";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";

const TimeInput = ({
  name,
  value,
  variant,
  setValue,
  mobile,
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const configTextfield = {
    ...field,
    ...otherProps,
    variant: variant ? variant : "standard",
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

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={bgLocale}>
      <TimePicker
        disableFuture
        label=""
        size="small"
        value={value}
        ampm={false}
        onChange={(newValue) => {
          setValue(newValue);
          setFieldValue(name, newValue);
        }}
        renderInput={(params) => (
          <TextField
            sx={mobile && { ...styles }}
            {...configTextfield}
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default TimeInput;
