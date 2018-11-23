import React from 'react';
import Wizard from 'components/User/Signup/SignupForm/components/Wizard/container/index';
import SignuFormTabsContainer from 'components/User/Signup/SignupForm/components/SignupFormTabs/container/index';
import { InputField, SwitchField } from 'utils/forms/render/index';
// the hoc
import { withNamespaces } from 'react-i18next';
import './styles/SignupForm.scss';

export class SignupForm extends React.Component {
	constructor( props ) {
		super(props);
		this.state = {
			haveSponsor: false
		};
	}

	handleChangeSponsor = () => 
		this.setState({
			haveSponsor: !this.state.haveSponsor
		});

    render() {
        const { t } = this.props;
        const tabs = [{ title: t('wizard.user_data') }, { title: t('wizard.network_account') }];
        const {haveSponsor} = this.state;

        return (
            <div className="signup_form shadow-lg px-5 pb-5 bg-white rounded position-relative">
				<SignuFormTabsContainer tabs={tabs} />
				<div className="signup_form__content">
					<Wizard onSubmit={() => null}>
						<Wizard.Page>
							<div className="row">
								<div className="col">
									<div className="form-group">
								  		<InputField 
								  			name="first_name"
								  			labelText={t('signup.first_name')}
								  			type="text" 
											className="form-control" />
									</div>
								</div>
								<div className="col">
									<div className="form-group">
								  		<InputField 
								  			name="last_name"
								  			labelText={t('signup.last_name')}
								  			type="text" 
											className="form-control"/>
									</div>
								</div>
							</div>
							<div className="form-group">
						  		<InputField 
						  			name="email"
						  			labelText={t('email')}
						  			type="email" 
									className="form-control"/>
							</div>
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
							<div className="form-group">
								<label className="pr-3" htmlFor="sponsor">
							  		<b>{t('signup.have_a_sponsor')}</b>
							  	</label>
							  	<label className="pr-3" htmlFor="sponsor">{t('no')}</label>
							  	<SwitchField 
							  		id="sponsor"
							  		name="sponsor"
							  		type="checkbox"
							  		className="custom-control-input"
							  		handleChange={this.handleChangeSponsor}
							  		checked={haveSponsor} />
								<label htmlFor="sponsor">{t('yes')}</label>
							</div>
						</Wizard.Page>
						<Wizard.Page>
							<div className="form-group">
						  		<InputField 
						  			name="name"
						  			labelText={t('name')}
						  			type="text" 
									className="form-control" />
							</div>
						</Wizard.Page>
					</Wizard>
				</div>
			</div>
        );
    }
}

export default withNamespaces()(SignupForm);