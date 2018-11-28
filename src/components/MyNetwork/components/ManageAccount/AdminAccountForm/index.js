import React from 'react';
import { Form } from 'react-final-form'
import ButtonForm from 'components/common/ButtonForm/index';
import Error from 'components/common/Error/index';
import globalAxios from 'config/api/index';
import { InputField } from 'utils/forms/render/index';
import { validate } from 'utils/forms/validators/index';
import validationSchema from 'components/MyNetwork/ManageAccount/ManageAccountForm/schema/index';
// the hoc
import { withNamespaces } from 'react-i18next';

export class ManageAccountForm extends React.Component {
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
            globalAxios.post('/invitation/', data)
                .then(response => {
                    this.setState({
                        isLoading: false,
                        errors: {}
                    });
                    console.log(response);
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
				<h2 className="login-form__title mb-5">{t('login_title')}</h2>
				<Form 
					onSubmit={this.handleSubmit} 
					validate={values => validate(values, validationSchema())}>
					{
						({handleSubmit, values, submitting}) => (
							<form name="manage-account-form" onSubmit={handleSubmit}>
								<Error errors={errors}/>
								<div className="form-group">
								  	<div className="input-group">
								  		<InputField 
								  			name="email"
								  			labelText={t('email')}
								  			type="email" 
											className="form-control"/>
									</div>
								</div>
								<ButtonForm 
									name={t('login.login_btn')} 
									nameLoading={t('login.login_btn_loading')}
									isLoading={isLoading}/>
							</form>
						)
					}
				</Form>
			</div>
        );
    }
}

export default withNamespaces()(ManageAccountForm);