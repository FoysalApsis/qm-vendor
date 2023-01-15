import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiFormControl-root": {
      height: "100%",
    },
  },
  textField: {
    "& .MuiInput-root": {
      height: "100%",
      "padding-left": "10px",
      margin: "0px",
      background: "#fff",
      borderTop: "0",
      "&::before": {
        display: "none",
      },
      "&::after": {
        display: "none",
      },
      "& .MuiInput-input": {
        height: "auto",
        paddingLeft: "10px",
      },
    },
  },
});

const MultipleAutoSelectField = ({
  textFieldProps,
  options,
  className,
  name,
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const { textField, root } = useStyles();

  const configTextfield = {
    ...field,
    ...otherProps,
    name,
    fullWidth: true,
    variant: "outlined",
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }
  const { setFieldValue, setTouched, touched } = useFormikContext();
  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      defaultValue={
        Array.isArray(configTextfield.value) ? configTextfield.value : []
      }
      value={Array.isArray(configTextfield.value) ? configTextfield.value : []}
      inputValue={
        typeof configTextfield.value === "string"
          ? configTextfield.value
          : undefined
      }
      sx={{ width: "100%", height: "100%" }}
      size="small"
      className={root}
      options={options}
      onChange={(e, value) => {
        setFieldValue(name, value);
      }}
      onBlur={() => {
        setTouched({ ...touched, roles: true });
      }}
      getOptionLabel={(option) => option.label}
      filterSelectedOptions={true}
      autoHighlight
      renderInput={(params) => (
        <TextField
          {...params}
          {...configTextfield}
          className={textField}
          variant="standard"
        />
      )}
    />
  );
};

export default MultipleAutoSelectField;
