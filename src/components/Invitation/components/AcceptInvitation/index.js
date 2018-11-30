import React from 'react';
import globalAxios from 'config/api/index';
import { withNamespaces } from 'react-i18next';
import { getParseQueryParams } from 'utils/index';
import Error from 'components/common/Error/index';
import format from 'string-format';

export class AcceptInvitation extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
            invitation: null,
            associated: false
        };
    }

	componentDidMount() {
		const qs = getParseQueryParams();
		const invitationId = qs['invitation'];
		if ( invitationId )		
			globalAxios.get(`/invitation/${invitationId}/`)
				.then( response => {
					this.setState({
						invitation: response.data
                    });
				})
				.catch(errors => {
                    this.setState({
                        errors: errors.response.data
                    });
                });
		else
			this.setState({
				errors: {detail: this.props.t("not_found")}
			});
	}

	handleClickAccceptInvitation = () => 
		globalAxios.post('/invitation/accept/', {invitation: getParseQueryParams()['invitation']})
			.then( response => {
					this.setState({
                        errors: {},
                        associated: true
                    });
				})
				.catch(errors => {
                    this.setState({
                        errors: errors.response.data
                    });
                });

	render() {
		const { errors, invitation, associated } = this.state;
		const { t } = this.props;

		return (
			<div className="container border p-3">
				<Error errors={errors} />
				{
					associated && (
						<div className="alert alert-success" role="alert">
							{t('invitation.description_success')}
						</div>
					)
				}
				{
					invitation && (
						<p className="p-3 border text-center">
							{format(t('invitation.description'), invitation.account_global, invitation.join_as)}
						</p>
					)
				}
				<button
					onClick={this.handleClickAccceptInvitation} 
					disabled={Object.keys(errors).length > 0} 
					className="btn btn-primary btn-lg btn-block mt-2">
					{t('invitation.accept')}
				</button>
			</div>
		)
	}	
} 

export default withNamespaces()(AcceptInvitation);