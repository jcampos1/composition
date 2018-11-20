import React from 'react';
import { Field } from 'react-final-form'
import Error from 'components/common/Error/index';
import globalAxios from 'config/api/index';
import {saveToken} from 'utils/localStorage/index';
import {FieldError, required} from 'utils/forms/validators/index';
import Wizard from 'components/User/Signup/SignupForm/components/Wizard/container/index';
import SignuFormTabsContainer from 'components/User/Signup/SignupForm/components/SignupFormTabs/container/index';
import { InputField } from 'utils/forms/render/index';
// the hoc
import { withNamespaces } from 'react-i18next';
import './styles/SignupForm.scss';

export class SignupForm extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			isLoading: false,
			errors: {}
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(data) {
		this.setState({
			isLoading: true
		}, () => {
			globalAxios.post('/accounts/signup/', data)
			.then(response => {
				console.log(response);
				// Save token in local storage
				saveToken(response.data.key);
				this.setState({
					isLoading: false,
					errors: {}
				});
				this.props.setAuthenticated();
			})
			.catch(errors => {
				this.setState({
					isLoading: false,
					errors: errors.response.data
				});
			});
		});
	}

	render () {
		const {isLoading, errors} = this.state;
		const {t} = this.props;
		const tabs = [{title: t('wizard.user_data')}, {title: t('wizard.network_account')}];

		return (
			<div className="signup_form shadow-lg px-5 pb-5 bg-white rounded position-relative">
				<SignuFormTabsContainer tabs={tabs} />
				<div className="signup_form__content">
					<Wizard onSubmit={this.handleSubmit}>
						<Wizard.Page>
							<div className="row">
								<div className="col">
									<div className="form-group">
								  		<InputField 
								  			name="first_name"
								  			labelText={t('signup.first_name')}
								  			type="text" 
											className="form-control" 
											validate={required} />
									</div>
								</div>
								<div className="col">
									<div className="form-group">
								  		<InputField 
								  			name="last_name"
								  			labelText={t('signup.last_name')}
								  			type="text" 
											className="form-control" 
											validate={required} />
									</div>
								</div>
							</div>
							<div className="form-group">
						  		<InputField 
						  			name="username"
						  			labelText={t('username')}
						  			type="text" 
									className="form-control" 
									validate={required} />
							</div>
							<div className="form-group">
						  		<InputField 
						  			name="email"
						  			labelText={t('email')}
						  			type="email" 
									className="form-control" 
									validate={required} />
							</div>
							<div className="form-group">
						  		<InputField 
						  			name="password1"
						  			labelText={t('password')}
						  			type="password" 
									className="form-control" 
									validate={required} />
							</div>
							<div className="form-group">
						  		<InputField 
						  			name="password2"
						  			labelText={t('signup.confirm_password')}
						  			type="password" 
									className="form-control" 
									validate={required} />
							</div>
							<div className="form-group">
						  		<InputField 
						  			name="phone_number"
						  			labelText={t('signup.phone_number')}
						  			type="text" 
									className="form-control" 
									validate={required} />
							</div>
						</Wizard.Page>
						<Wizard.Page>
							<div>
								<label htmlFor="name"></label>
								<Field 
									name="name" 
									component="input" 
									type="text" 
									className="form-control" 
									placeholder={t('name')}
									validate={required} />
								<FieldError name="name" />
							</div>
						</Wizard.Page>
					</Wizard>
				</div>
			</div>
		);
	}
}

export default withNamespaces()(SignupForm);