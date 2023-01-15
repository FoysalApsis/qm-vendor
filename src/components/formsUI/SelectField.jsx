import { useField, useFormikContext } from "formik";
import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  textField: {
    "& .MuiInput-root": {
      height: "100%",
      margin: "0px",
      borderTop: "0",
      background: "#fff",
      "&::before": {
        display: "none",
      },
      "&::after": {
        display: "none",
      },
      "& .MuiInput-input": {
        height: "100%",
        paddingLeft: "10px",
      },
    },
  },
  root: {
    "& .MuiFormControl-root": {
      height: "100%",
    },
  },
});

const SelectField = ({
  name,
  options,
  value,
  sx,
  disable,
  onChange,
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const { textField, root } = useStyles();
  const configTextfield = {
    ...field,
    ...otherProps,
    name,
    variant: "outlined",
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }
  const { setFieldValue, setTouched, touched } = useFormikContext();

  return (
    <Autocomplete
      {...field}
      value={value}
      sx={{ ...sx, width: "100%", height: "100%" }}
      options={options ? options : []}
      disabled={disable}
      className={root}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      onChange={(_, value) =>
        onChange ? onChange(value, setFieldValue) : setFieldValue(name, value)
      }
      onBlur={() => setTouched({ ...touched, [name]: true })}
      renderInput={(props) => (
        <TextField {...props} className={textField} variant="standard" />
      )}
    />
  );
};

export default SelectField;
