import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import PropTypes from "prop-types";
import styled from "styled-components";

// Styled form container using styled-components
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
  background-color: #af0000;
`;

const Form = ({ initialValues, onSubmit, fields, submitLabel }) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {fields.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          name={field.name}
          value={values[field.name] || ""}
          onChange={handleChange}
          type={field.type || "text"}
          required={field.required}
          variant="outlined"
        />
      ))}
      <Box textAlign="center">
        <Button variant="contained" type="submit">
          {submitLabel}
        </Button>
      </Box>
    </StyledForm>
  );
};

Form.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      required: PropTypes.bool,
    })
  ).isRequired,
  submitLabel: PropTypes.string,
};

Form.defaultProps = {
  initialValues: {},
  submitLabel: "Submit",
};

export default Form;
