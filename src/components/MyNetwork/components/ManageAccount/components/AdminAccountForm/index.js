import React from 'react';
import { Form } from 'react-final-form'
import ButtonForm from 'components/common/ButtonForm/index';
import Error from 'components/common/Error/index';
import globalAxios from 'config/api/index';
import { InputField, RadioField } from 'utils/forms/render/index';
import { validate } from 'utils/forms/validators/index';
import validationSchema from 'components/MyNetwork/components/ManageAccount/components/AdminAccountForm/schema/index';
import {OWNER, CO_OWNER, BENEFICIARY, CUSTOMER} from 'components/MyNetwork/components/ManageAccount/components/AdminAccountForm/constants/index';
// the hoc
import { withNamespaces } from 'react-i18next';

export class ManageAccountForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            errors: {},
            user_account_global: null,
            roles: [
                {

                }
            ]
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        globalAxios.get('/user-account-global/in-use/')
            .then(response => {
                this.setState({
                    user_account_global: response.data
                });
            });
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

        if ( this.state.user_account_global === null )
            return <div>{t('loading')}</div>

        const {related_as} = this.state.user_account_global;

        return (
            <div className="login-form shadow-lg p-5 bg-white rounded">
				<h2 className="login-form__title mb-5">{t('my_network.admin_account.add_user')}</h2>
				<Form 
					onSubmit={this.handleSubmit}
                    initialValues={{join_as: [OWNER, CO_OWNER].includes(related_as) ? OWNER : CUSTOMER }} 
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
                                <div className="p-3 border text-center">
                                    {t('my_network.admin_account.rol_to_user')}
                                </div>
                                {
                                    [OWNER, CO_OWNER].includes(related_as) && (
                                        <React.Fragment>
                                            <div className="form-check form-check-inline">
                                                <RadioField
                                                        id="relatedAsOwner"
                                                        name="join_as"
                                                        value={OWNER}
                                                        checked={values['join_as'] === OWNER}
                                                        labelText={t('my_network.admin_account.owner')}
                                                        className="form-check-input" />
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <RadioField
                                                        id="relatedAsCoOwner"
                                                        name="join_as"
                                                        value={CO_OWNER}
                                                        checked={values['join_as'] === CO_OWNER}
                                                        labelText={t('my_network.admin_account.co_owner')}
                                                        className="form-check-input" />
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <RadioField
                                                        id="relatedAsBeneficiary"
                                                        name="join_as"
                                                        value={BENEFICIARY}
                                                        checked={values['join_as'] === BENEFICIARY}
                                                        labelText={t('my_network.admin_account.beneficiary')}
                                                        className="form-check-input" />
                                            </div>
                                        </React.Fragment>
                                    ) 
                                }
                                <div className="form-check form-check-inline">
                                    <RadioField
                                            id="relatedAsCustomer"
                                            name="join_as"
                                            value={CUSTOMER}
                                            checked={values['join_as'] === CUSTOMER}
                                            labelText={t('my_network.admin_account.customer')}
                                            className="form-check-input" />
                                </div>
                                <div className="py-3 text-justify">
                                    <small>{t('my_network.admin_account.description')}</small>
                                </div>
								<ButtonForm 
									name={t('my_network.admin_account.add_user')} 
									nameLoading={t('my_network.admin_account.add_user_loading')}
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