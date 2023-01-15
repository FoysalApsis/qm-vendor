import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useField, useFormikContext } from "formik";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .css-ahj2mt-MuiTypography-root": {
      fontFamily: "FuturaLight",
    },
  },
}));

const CheckBox = ({ name, label, legend, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const { root } = useStyles();

  const handleChange = (evt) => {
    const { checked } = evt.target;
    setFieldValue(name, checked);
  };

  const configCheckbox = {
    ...field,
    ...otherProps,
    onChange: handleChange,
  };

  const configFormControl = {};
  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }

  return (
    <FormControl {...configFormControl}>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox {...configCheckbox} />}
          label={label}
          className={root}
        />
      </FormGroup>
    </FormControl>
  );
};

export default CheckBox;
