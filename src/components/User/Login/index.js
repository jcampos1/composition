import React from 'react';
import LoginFormContainer from 'components/User/Login/LoginForm/container/index';
import { Redirect } from 'react-router-dom';
import HeaderUser from 'components/common/HeaderUser/index';
import Footer from 'components/common/Footer/index';
import './styles/login.scss';
import 'styles/index.scss';

class Login extends React.PureComponent {
	render() {
		const {isAuthenticated} = this.props;

		if (isAuthenticated)
			return <Redirect to="/my-network"/>

		return (
			<React.Fragment>
				<HeaderUser/>
				<div className="content w-100 h-auto position-relative">
					<div className="p-3 content__login_form position-relative">
						<LoginFormContainer />
					</div>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

export default Login;