import React from 'react';
import ButtonForm from 'components/common/ButtonForm/index';
import Error from 'components/common/Error/index';
import { Link } from 'react-router-dom';
import { RenderInput } from 'utils/forms/render/index';
import { withRouter } from 'react-router';
// the hoc
import { withNamespaces } from 'react-i18next';
import {Field, reduxForm} from 'redux-form';
import { required, email, length } from 'redux-form-validators';
import format from 'string-format';

export class LoginForm extends React.PureComponent {

    render() {
        const { t, location, handleSubmit, isLoading, errors } = this.props;

        return (
            <div className="user-form shadow-lg p-5 bg-white rounded">
				<h2 className="user-form__title mb-4">{t('login_title')}</h2>
					<form name="user-form" onSubmit={handleSubmit}>
						<Error errors={errors}/>
						<div className="form-group">
					        <Field
					          	name="email"
					          	type="email"
					          	img="/images/ett-username.svg"
					          	component={RenderInput}
					          	placeholder={t('email')}
					          	className="form-control"
					          	validate={[required({message: t('validations.required')}), email()]}
					        />
						</div>
						<div className="form-group mb-2">
					        <Field
					          	name="password"
					          	img="/images/ett-password.svg"
					          	type="password"
					          	component={RenderInput}
					          	placeholder={t('password')}
					          	className="form-control"
					          	validate={[required(), length({min: 6, message: format(t('validations.min'), '6')})]}
					        />
						</div>
						<div className="user-form__tab">
							<div className="user-form__small mb-4">
								<label>{t('forgot_password')}</label>
							</div>
						</div>
						<ButtonForm 
							name={t('login.login_btn')} 
							nameLoading={t('login.login_btn_loading')}
							isLoading={isLoading}/>
						<div className="user-form__tab">
							<label className="user-form__small mt-3 d-block text-center">{t('without_account')}</label>
							<Link 
								to={{
									pathname: "/signup",
									search: location.search
								}} 
								className="user-form__tab__create_account d-block text-center">
								{t('create_account')}
							</Link>
						</div>
					</form>
			</div>
        );
    }
}

const LoginReduxForm = reduxForm ({
  	form: 'loginForm'
}) (LoginForm);

export default withRouter(withNamespaces()(LoginReduxForm));