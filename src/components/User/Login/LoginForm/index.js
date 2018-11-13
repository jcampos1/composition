import React from 'react';
import { Field, reduxForm } from 'redux-form';
import ButtonForm from 'components/common/ButtonForm/index';

export class LoginForm extends React.Component {
	render() {
		const {handleSubmit, isLoading, errors} = this.props;

		return (
			<form name="login-form" onSubmit={handleSubmit}>
				{
					errors.length > 0 &&
						<div className="alert alert-danger" role="alert">
		  					{
		  						errors.map((error, index) => (
		  							<label key={`error_login{index}`}>{error}</label>
		  						))
		  					}
						</div>
				}
				<div>
					<label htmlFor="username">Username or email</label>
					<Field name="username" component="input" type="text" className="form-control" />
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<Field name="password" component="input" type="password" className="form-control" />
				</div>
				<ButtonForm 
					name="Log in" 
					nameLoading="Logging in"
					isLoading={isLoading}/>
			</form>
		) 
	}
}

const LoginReduxForm = reduxForm({
  // a unique name for the form
  form: 'loginForm'
})(LoginForm)

export default LoginReduxForm;



