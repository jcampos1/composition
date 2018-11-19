import React from 'react';
import SignupFormContainer from 'components/User/Signup/SignupForm/container/index';
import { Redirect } from 'react-router-dom';
import Language from 'components/common/Language/index';
import HeaderUser from 'components/common/HeaderUser/index';
import Footer from 'components/common/Footer/index';

class Signup extends React.PureComponent {
	render() {
		const {isAuthenticated} = this.props;

		return (
			<React.Fragment>
				<HeaderUser/>
				<Footer />
			</React.Fragment>
		);
	}
}

export default Signup;