import React from 'react';
import { Form } from 'react-final-form';
import { withRouter } from 'react-router';
import { getParseQueryParams } from 'utils/index';
import { withNamespaces } from 'react-i18next';
import { InputField } from 'utils/forms/render/index';
import { validate } from 'utils/forms/validators/index';
import Error from 'components/common/Error/index';
import validationSchema from 'components/Account/components/AccountForm/schema/index';
import ButtonForm from 'components/common/ButtonForm/index';
import globalAxios from 'config/api/index';
import format from 'string-format';

export class AccountForm extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            errors: {},
            accountToJoin: null,
            showInvitationCode: false,
            pk: getParseQueryParams()['link']
        };
    }

    componentDidMount() {
    	const { pk } = this.state;
    	if ( pk )
    		globalAxios.get(`/account-global/${pk}/`)
            .then(response => {
                this.setState({ accountToJoin: response.data });
            })
            .catch(errors => {
                this.setState({ showInvitationCode: true });
            });
    	else
    		this.setState({ showInvitationCode: true });
    }

	handleSubmit = data =>
        this.setState({
            isLoading: true
        }, () => {
           const { accountToJoin } = this.state;
           const promise = accountToJoin 
				? globalAxios.post('/account-global/', data, {
					params: {
						link: this.state.pk
					}})
				: globalAxios.post('/account-global/', data);

           promise
           		.then(response => {
	                this.setState({
	                    isLoading: false,
	                    errors: {}
	                }, () => this.props.history.push("/my-network"))
	            })
	            .catch(errors => {
	            	console.log(errors);
	                this.setState({
	                    isLoading: false,
	                    errors: errors.response.data
	                });
	            });
        });

	render() {
		const { errors, isLoading, accountToJoin, showInvitationCode, pk } = this.state;
		const { t } = this.props;

		return (
			<div className="container border p-3">
				<h2>{t('wizard.network_account')}</h2>
				{
					showInvitationCode && pk && (
						<div className="alert alert-danger" role="alert">
							{t('account.account_does_not_exist_description')}
						</div>
					)
				}
				{
					accountToJoin &&  (
						<div className="alert alert-info" role="alert">
							{format(t('account.to_join_description'), accountToJoin.name)}
						</div>
					)
				}
				<Form 
					onSubmit={this.handleSubmit} 
					validate={values => validate(values, validationSchema())}>
					{
						({handleSubmit, values, submitting}) => (
							<form name="account-form" onSubmit={handleSubmit}>
								<Error errors={errors}/>
								<div className="form-group">
									<InputField 
								  			name="name"
								  			labelText={t('name')}
								  			type="text" 
											className="form-control" />
								</div>
								{
									showInvitationCode && (
										<div className="form-group">
											<InputField 
										  			name="invitation_code"
										  			labelText={t('account.invitation_code')}
										  			type="text" 
													className="form-control" />
										</div>
									)
								}
								<ButtonForm 
									name={t('wizard.network_account')} 
									nameLoading={t('wizard.network_account_loading')}
									isLoading={isLoading}/>
							</form>
						)
					}
				</Form>
			</div>

		)
	}
}

export default withRouter(withNamespaces()(AccountForm));

