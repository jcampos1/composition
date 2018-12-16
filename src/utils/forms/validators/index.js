import React from 'react';

export const FieldError = ({ name }) => (
    <Field
    name={name}
    subscribe={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <small className="field_error">{error}</small> : null
    }
  />
);