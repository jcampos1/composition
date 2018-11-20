import React from 'react';
import {Field} from 'react-final-form';

export const required = value => (value ? undefined : 'Required')

export const FieldError = ({ name }) => (
  <Field
    name={name}
    subscribe={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
)
