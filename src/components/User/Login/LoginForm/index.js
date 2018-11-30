import React from 'react';
import { Form } from 'react-final-form'
import ButtonForm from 'components/common/ButtonForm/index';
import Error from 'components/common/Error/index';
import globalAxios from 'config/api/index';
import { saveToken } from 'utils/localStorage/index';
import { Link } from 'react-router-dom';
import { InputField } from 'utils/forms/render/index';
import { validate } from 'utils/forms/validators/index';
import validationSchema from 'components/User/Login/LoginForm/schema/index';
import { withRouter } from 'react-router';
// the hoc
import { withNamespaces } from 'react-i18next';
import './styles/LoginForm.scss';

export class LoginForm extends React.Component {
    constructor(props) {
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

    render() {
        const { isLoading, errors } = this.state;
        const { t, location } = this.props;

        return (
            <div className="login-form shadow-lg p-5 bg-white rounded">
				<h2 className="login-form__title mb-5">{t('login_title')}</h2>
				<Form 
					onSubmit={this.handleSubmit} 
					validate={values => validate(values, validationSchema())}>
					{
						({handleSubmit, values, submitting}) => (
							<form name="login-form" onSubmit={handleSubmit}>
								<Error errors={errors}/>
								<div className="form-group">
								  	<div className="input-group">
								  		<InputField 
								  			name="username"
								  			labelText={t('username')}
								  			type="text" 
											className="form-control"/>
										<span className="input-group-icon" id="exampleIconInput1Help">
									    	<img className="material-icons" src="/images/ett-username.svg" width="35px" alt="language" />
									    </span>
									</div>
								</div>
								<div className="form-group mb-2">
								  	<div className="input-group">
								  		<InputField 
								  			name="password"
								  			labelText={t('password')}
								  			type="password" 
											className="form-control"/>
										<span className="input-group-icon" id="exampleIconInput1Help">
									    	<img className="material-icons" src="/images/ett-password.svg" width="35px" alt="language" />
									    </span>
									</div>
								</div>
								<div className="login-form__tab">
									<div className="login-form__small mb-4">
										<label>{t('forgot_password')}</label>
									</div>
								</div>
								<ButtonForm 
									name={t('login.login_btn')} 
									nameLoading={t('login.login_btn_loading')}
									isLoading={isLoading}/>
								<div className="login-form__tab">
									<label className="login-form__small mt-3 d-block text-center">{t('without_account')}</label>
									<Link 
										to={{
											pathname: "/signup",
											search: location.search
										}} 
										className="login-form__tab__create_account d-block text-center">
										{t('create_account')}
									</Link>
								</div>
							</form>
						)
					}
				</Form>
			</div>
        );
    }
}

export default withRouter(withNamespaces()(LoginForm));