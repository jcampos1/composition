import React from 'react';
import { Form, Field } from 'react-final-form'
import ButtonForm from 'components/common/ButtonForm/index';
import Error from 'components/common/Error/index';
import globalAxios from 'config/api/index';
import {saveToken} from 'utils/localStorage/index';
// the hoc
import { withNamespaces } from 'react-i18next';

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

		return (
			<Form onSubmit={this.handleSubmit}>
				{
					({handleSubmit, values, submitting}) => (
						<form name="signup-form" onSubmit={handleSubmit}>
							<Error errors={errors}/>
							<div>
								<label htmlFor="username">{t('username')}</label>
								<Field name="username" component="input" type="text" className="form-control" placeholder={t('username')} />
							</div>
							<div>
								<label htmlFor="email">{t('email')}</label>
								<Field name="email" component="input" type="email" className="form-control" placeholder={t('email')} />
							</div>
							<div>
								<label htmlFor="password1">{t('password')}</label>
								<Field name="password1" component="input" type="password" className="form-control" placeholder={t('password')} />
							</div>
							<div>
								<label htmlFor="password2">{t('signup.confirm_password')}</label>
								<Field name="password2" component="input" type="password" className="form-control" placeholder={t('signup.confirm_password')} />
							</div>
							<div>
								<label htmlFor="phone_number">{t('signup.phone_number')}</label>
								<Field name="phone_number" component="input" type="text" className="form-control" placeholder={t('signup.phone_number')} />
							</div>
							<ButtonForm 
								name={t('signup.signup_btn')} 
								nameLoading={t('signup.signup_btn_loading')}
								isLoading={isLoading}/>
						</form>
					)
				}
			</Form>
		);
	}
}

export default withNamespaces()(SignupForm);