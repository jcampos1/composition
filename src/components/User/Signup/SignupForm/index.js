import React from 'react';
// the hoc
import { withNamespaces } from 'react-i18next';
import {Field, reduxForm} from 'redux-form';
import ButtonForm from 'components/common/ButtonForm/index';
import Error from 'components/common/Error/index';
import { Link } from 'react-router-dom';
import { RenderInput } from 'utils/forms/render/index';
import { withRouter } from 'react-router';
import { required, email, length, confirmation } from 'redux-form-validators';
import format from 'string-format';

export class SignupForm extends React.PureComponent {

    render() {
        const { t, location, handleSubmit, isLoading, errors, isCreated } = this.props;

        return (
        	<div className="user-form shadow-lg p-5 bg-white rounded">
				<h2 className="user-form__title mb-4">{t('create_account')}</h2>
				{
					isCreated && (
						<div className="alert alert-primary" role="alert">
							Operación realizada exitosamente.&nbsp; 
							<Link 
								to={{
									pathname: "/login",
									search: location.search
								}} 
								className="user-form__tab__create_account">
								<b>{t('login.login_btn')}</b>
							</Link>
						</div>
					)
				}
				<form name="user-form" onSubmit={handleSubmit}>
					<Error errors={errors}/>
					<div className="form-group mb-2">
				        <Field
				          	name="first_name"
				          	type="text"
				          	img="/images/ett-username.svg"
				          	component={RenderInput}
				          	placeholder={t('signup.first_name')}
				          	className="form-control"
				          	validate={[required({message: t('validations.required')})]}
				        />
					</div>
					<div className="form-group mb-2">
				        <Field
				          	name="last_name"
				          	type="text"
				          	img="/images/ett-username.svg"
				          	component={RenderInput}
				          	placeholder={t('signup.last_name')}
				          	className="form-control"
				          	validate={[required({message: t('validations.required')})]}
				        />
					</div>
					<div className="form-group mb-2">
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
					<div className="form-group mb-2">
				        <Field
				          	name="confirm_password"
				          	img="/images/ett-password.svg"
				          	type="password"
				          	component={RenderInput}
				          	placeholder={t('signup.confirm_password')}
				          	className="form-control"
				          	validate={[
				          		required(), 
				          		length({min: 6, message: format(t('validations.min'), '6')}),
				          		confirmation({ field: 'password', message: t('signup.validations.password_dont_match')})
				          	]}
				        />
					</div>
					<ButtonForm 
						name={t('signup.signup_btn')} 
						nameLoading={t('signup.signup_btn_loading')}
						isLoading={isLoading}/>
					<div className="user-form__tab">
						<label className="user-form__small mt-3 d-block text-center">
							{t('signup.have_account')}
						</label>
						<Link 
							to={{
								pathname: "/login",
								search: location.search
							}} 
							className="user-form__tab__create_account d-block text-center">
							{t('login.login_btn')}
						</Link>
					</div>
				</form>
			</div>
        );
    }
}

const SignupReduxForm = reduxForm ({
  	form: 'signupForm'
}) (SignupForm);

export default withRouter(withNamespaces()(SignupReduxForm));