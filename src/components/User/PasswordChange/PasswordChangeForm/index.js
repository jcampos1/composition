import React from 'react';
import { Form } from 'react-final-form'
import ButtonForm from 'components/common/ButtonForm/index';
import Error from 'components/common/Error/index';
import globalAxios from 'config/api/index';
import { Link } from 'react-router-dom';
import { InputField } from 'utils/forms/render/index';
import { validate } from 'utils/forms/validators/index';
import validationSchema from 'components/User/PasswordChange/schema/index';
// the hoc
import { withNamespaces } from 'react-i18next';

export class PasswordChangeForm extends React.Component {
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
            globalAxios.post('/accounts/password/change/', data)
                .then(response => {
                	console.log(response);
                    this.setState({
                        isLoading: false,
                        errors: {}
                    });
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
        const { t } = this.props;

        return (
            <div className="login-form shadow-lg p-5 bg-white rounded">
				<h2 className="login-form__title mb-5">{t('password_change.title')}</h2>
				<Form 
					onSubmit={this.handleSubmit} 
					validate={values => validate(values, validationSchema())}>
					{
						({handleSubmit, values, submitting}) => (
							<form name="login-form" onSubmit={handleSubmit}>
								<Error errors={errors}/>
								<div className="form-group">
							  		<InputField 
							  			name="password1"
							  			labelText={t('password')}
							  			type="password" 
										className="form-control" />
								</div>
								<div className="form-group">
							  		<InputField 
							  			name="password2"
							  			labelText={t('signup.confirm_password')}
							  			type="password" 
										className="form-control" />
								</div>
								<ButtonForm 
									name={t('password_change.save_password')} 
									nameLoading={t('password_change.saving_password')}
									isLoading={isLoading}/>
							</form>
						)
					}
				</Form>
			</div>
        );
    }
}

export default withNamespaces()(PasswordChangeForm);