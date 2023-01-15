import React from "react";

import { useFormikContext } from "formik";

const SubmitButton = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const configButton = {
    ...otherProps,
    onSubmit: handleSubmit,
  };

  return (
    <button style={{ color: "#fff" }} {...configButton}>
      {children}
    </button>
  );
};

export default SubmitButton;
