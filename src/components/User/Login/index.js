import React from 'react';
import LoginFormContainer from 'components/User/Login/LoginForm/container/index';
import { Redirect } from 'react-router-dom';
import Language from 'components/common/Language/index';

class Login extends React.PureComponent {
	render() {
		const {isAuthenticated} = this.props;

		if (isAuthenticated)
			return <Redirect to="/my-network"/>

		return (
			<div className="position-fixed">
				<Language />
				<div className="shadow-lg p-3 bg-white rounded">
					<LoginFormContainer/>
				</div>
			</div>
		);
	}
}

export default Login;