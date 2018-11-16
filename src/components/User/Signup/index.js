import React from 'react';
import SignupFormContainer from 'components/User/Signup/SignupForm/container/index';
import { Redirect } from 'react-router-dom';
import Language from 'components/common/Language/index';

class Signup extends React.PureComponent {
	render() {
		const {isAuthenticated} = this.props;

		if (isAuthenticated)
			return <Redirect to="/my-network"/>

		return (
			<div className="position-fixed">
				<Language />
				<div className="shadow-lg p-3 bg-white rounded">
					<SignupFormContainer/>
				</div>
			</div>
		);
	}
}

export default Signup;