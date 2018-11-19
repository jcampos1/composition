import React from 'react';
import { Form, Field } from 'react-final-form'
import ButtonForm from 'components/common/ButtonForm/index';
import Error from 'components/common/Error/index';
import globalAxios from 'config/api/index';
import {saveToken} from 'utils/localStorage/index';
import {Link} from 'react-router-dom';
// the hoc
import { withNamespaces } from 'react-i18next';
import './styles/LoginForm.scss';

export class LoginForm extends React.Component {
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
			globalAxios.post('/accounts/login/', data)
			.then(response => {
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
			<div className="login-form shadow-lg p-5 bg-white rounded">
				<h2 className="login-form__title mb-4">{t('login_title')}</h2>
				<Form onSubmit={this.handleSubmit}>
					{
						({handleSubmit, values, submitting}) => (
							<form name="login-form" onSubmit={handleSubmit}>
								<Error errors={errors}/>
								<div>
									<label htmlFor="username">{t('username')}</label>
									<Field name="username" component="input" type="text" className="form-control" placeholder={t('username')} />
								</div>
								<div className="mb-2">
									<label htmlFor="password">{t('password')}</label>
									<Field name="password" component="input" type="password" className="form-control" placeholder={t('password')} />
								</div>
								<div className="login-form__small mb-4">
									<label>{t('forgot_password')}</label>
								</div>
								<ButtonForm 
									name={t('login.login_btn')} 
									nameLoading={t('login.login_btn_loading')}
									isLoading={isLoading}/>
								<label className="login-form__small mt-2 d-block">{t('without_account')}</label>
								<Link to="/signup" className="d-block text-center">{t('create_account')}</Link>
							</form>
						)
					}
				</Form>
			</div>
		);
	}
}

export default withNamespaces()(LoginForm);