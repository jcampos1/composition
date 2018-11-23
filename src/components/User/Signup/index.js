import React from 'react';
import SignupFormContainer from 'components/User/Signup/SignupForm/container/index';
import HeaderUser from 'components/common/HeaderUser/index';
import Footer from 'components/common/Footer/index';
import { withNamespaces } from 'react-i18next';
import './styles/Signup.scss';

class Signup extends React.PureComponent {
	render() {
		const {t} = this.props;

		return (
			<React.Fragment>
				<HeaderUser/>
				<div className="signup_content w-100 h-auto position-relative">
					<div className="p-3 signup_content_form position-relative">
						<label className="signup_content_form__title d-block mb-3">{t('signup.create_your_account')}</label>
						<SignupFormContainer />
					</div>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

export default withNamespaces()(Signup);