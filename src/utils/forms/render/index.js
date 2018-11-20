import React from 'react';
import {Field} from 'react-final-form';
import {FieldError} from 'utils/forms/validators/index';

export const InputField = ({name, labelText, placeholder, validate, type, className}) =>
	<div className="floating-label">
		<label>{labelText}</label>
		<Field 
			name={name}
			component="input" 
			type={type}
			className={className}
			placeholder={placeholder ? placeholder : name}
			validate={validate} />
		<FieldError name={name} />
	</div>