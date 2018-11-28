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
			placeholder={placeholder ? placeholder : labelText}
			validate={validate} />
		<FieldError name={name} />
	</div>

export const SwitchField = ({id, name, type, checked, className, handleChange}) =>
	<div className="custom-control custom-switch d-inline-block">
		<Field 
			id={id}
			name={name}
			component="input" 
			type={type}
			className={className}
			onChange={handleChange}
			checked={checked} />
		<span className="custom-control-track"/>
		<label className="custom-control-label" htmlFor={id}/>
	</div>

export const RadioField = ({id, name, value, checked, labelText, validate, className}) =>
	<React.Fragment>
		<Field
			id={id} 
			name={name}
			component="input"
			value={value}
			checked={checked}
			type="radio"
			className={className}
			validate={validate} />
		<label className="form-check-label" htmlFor={id}>
        	{labelText}
        </label>
		<FieldError name={name} />
	</React.Fragment>