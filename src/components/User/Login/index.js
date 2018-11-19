import React from 'react';
import LoginFormContainer from 'components/User/Login/LoginForm/container/index';
import { Redirect } from 'react-router-dom';
import Language from 'components/common/Language/index';
import HeaderUser from 'components/common/HeaderUser/index';
import './styles/login.scss';

class Login extends React.PureComponent {
	render() {
		const {isAuthenticated} = this.props;

		if (isAuthenticated)
			return <Redirect to="/my-network"/>

		return (
			<React.Fragment>
				<HeaderUser/>
				<div className="content w-100 h-auto position-relative">
					<div className="p3 content__login_form position-relative">
						<LoginFormContainer />
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Login;