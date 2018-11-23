import React from 'react';
import { Field } from 'react-final-form';
import { setIn } from 'final-form';

export const required = value => (value ? undefined : 'Required');

export const minLength = value => (value.length >= 8 ? undefined : 'At least 8 characters are expected');

export const validatePassword = value => (value ? minLength(value) : required(value));

// export const onlyText = value => ((new RegExp(['A-Za-z'])).test(value) ? undefined : "Only letters are allowed";

export const confirmationPassword = (value, allValues) => {
    if (value) {
    	const min = minLength(value);
    	if (min === undefined)
        	return value !== allValues['password1'] ? "Passwords do not match" : undefined;
        else
        	return min;
    }
    else
        return required(value);
}

export const FieldError = ({ name }) => (
    <Field
    name={name}
    subscribe={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
);

export const validate = async (values, schema) => {
  if (typeof schema === 'function') {
    schema = schema();
  }

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (e) {
    return e.inner.reduce((errors, error) => {
      return setIn(errors, error.path, error.message);
    }, {});
  }
}