import React from 'react';

export const RenderInput = (props) => {
    return (
        <React.Fragment>
	        <label>{props.placeholder}</label>
		  	<div className="input-group">
		  		<div className="input-group-prepend">
		          <span className="input-group-text" id="inputGroupPrepend3">
		          	<img className="material-icons" src={props.img} width="23" alt="language" />
		          </span>
		        </div>
	      		<input 
	      			name={props.name}
	      			type={props.type}
	      			className={props.className}
					placeholder={props.placeholder} 
					{...props.input} />
			</div>
      		{
      			props.meta.touched && props.meta.error && 
      				<small className="field_error">{props.meta.error}</small>
      		}
    	</React.Fragment>
    )
}