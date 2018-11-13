import React from 'react';
import LoginReduxForm from 'components/User/Login/LoginForm/index';
import globalAxios from 'config/api/index';
import {saveToken} from 'utils/localStorage/index';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			errors: []
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(data) {
		this.setState({
			isLoading: true
		}, () => {
			globalAxios.post('/accounts/login/', data)
			.then(response => {
				// Save token in local storage
				saveToken(response.data.key);
				this.setState({
					isLoading: false,
					errors: []
				});
				this.props.setAuthenticated();
			})
			.catch(errors => {
				this.setState({
					isLoading: false,
					errors: errors.response.data.non_field_errors
				});
			});
		});
	}

	render() {
		const {isLoading, errors} = this.state;
		const {isAuthenticated} = this.props;

		if (isAuthenticated)
			return <Redirect to="/my-network"/>

		return (
			<div className="position-fixed">
				<div className="shadow-sm p-3 bg-white rounded">
					<LoginReduxForm 
						onSubmit={this.handleSubmit}
						isLoading={isLoading}
						errors={errors}/>
				</div>
			</div>
		);
	}
}

export default Login;