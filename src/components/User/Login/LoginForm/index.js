import React from 'react';
import { Form, Field } from 'react-final-form'
import ButtonForm from 'components/common/ButtonForm/index';
import Error from 'components/common/Error/index';
import globalAxios from 'config/api/index';
import {saveToken} from 'utils/localStorage/index';
// the hoc
import { withNamespaces } from 'react-i18next';

export class LoginForm extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			isLoading: false,
			errors: []
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
					errors: []
				});
				this.props.setAuthenticated();
			})
			.catch(errors => {
				this.setState({
					isLoading: false,
					errors: errors.response.data.non_field_errors
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
						<form name="login-form" onSubmit={handleSubmit}>
							<Error errors={errors}/>
							<div>
								<label htmlFor="username">{t('login.username')}</label>
								<Field name="username" component="input" type="text" className="form-control" placeholder={t('login.username')} />
							</div>
							<div>
								<label htmlFor="password">{t('login.password')}</label>
								<Field name="password" component="input" type="password" className="form-control" placeholder={t('login.password')} />
							</div>
							<ButtonForm 
								name={t('login.login_btn')} 
								nameLoading={t('login.login_btn_loading')}
								isLoading={isLoading}/>
						</form>
					)
				}
			</Form>
		);
	}
}

export default withNamespaces()(LoginForm);