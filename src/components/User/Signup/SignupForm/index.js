import React from 'react';
import { Field } from 'react-final-form'
import Error from 'components/common/Error/index';
import globalAxios from 'config/api/index';
import {saveToken} from 'utils/localStorage/index';
import {FieldError, required} from 'utils/forms/validators/index';
import Wizard from 'components/User/Signup/SignupForm/components/Wizard/container/index';
import SignuFormTabsContainer from 'components/User/Signup/SignupForm/components/SignupFormTabs/container/index';
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
		console.log(data);
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
									<label htmlFor="first_name"></label>
									<Field 
										name="first_name" 
										component="input" 
										type="text" 
										className="form-control" 
										placeholder={t('signup.first_name')}
										validate={required} />
									<FieldError name="first_name" />
								</div>
								<div className="col">
									<label htmlFor="last_name"></label>
									<Field 
										name="last_name" 
										component="input" 
										type="text" 
										className="form-control" 
										placeholder={t('signup.last_name')}
										validate={required} />
									<FieldError name="last_name" />
								</div>
							</div>
							<div>
								<label htmlFor="username"></label>
								<Field 
									name="username" 
									component="input" 
									type="text" 
									className="form-control" 
									placeholder={t('username')}
									validate={required} />
								<FieldError name="username" />
							</div>
							<div>
								<label htmlFor="email"></label>
								<Field 
									name="email" 
									component="input" 
									type="email" 
									className="form-control" 
									placeholder={t('email')}
									validate={required} />
								<FieldError name="email" />
							</div>
							<div>
								<label htmlFor="password1"></label>
								<Field 
									name="password1" 
									component="input" 
									type="password" 
									className="form-control" 
									placeholder={t('password')}
									validate={required} />
								<FieldError name="password1" />
							</div>
							<div>
								<label htmlFor="password2"></label>
								<Field 
									name="password2" 
									component="input" 
									type="password" 
									className="form-control" 
									placeholder={t('signup.confirm_password')} 
									validate={required} />
								<FieldError name="password2" />
							</div>
							<div>
								<label htmlFor="phone_number"></label>
								<Field 
									name="phone_number" 
									component="input" 
									type="text" 
									className="form-control" 
									placeholder={t('signup.phone_number')}
									validate={required} />
								<FieldError name="phone_number" />
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