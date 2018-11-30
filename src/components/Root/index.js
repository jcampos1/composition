import React from 'react';
import {Provider} from 'react-redux';
import PropTypes from 'prop-types';
import LoginContainer from 'components/User/Login/container/index';
import SignupContainer from 'components/User/Signup/container/index';
import PasswordChangeForm from 'components/User/PasswordChange/components/PasswordChangeForm/index';
import MyNetworkContainer from 'components/MyNetwork/container/index';
import AcceptInvitation from 'components/Invitation/components/AcceptInvitation/index';
import AccountForm from 'components/Account/components/AccountForm/index';
import ManageAccountForm from 'components/MyNetwork/components/ManageAccount/components/AdminAccountForm/index';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class Root extends React.PureComponent {
	render() {
		const {store} = this.props;
		
		return(
			<Provider store={store}>
				<Router>
					<React.Fragment>
						<Route exact path="/" component={() => <Redirect to="/login"/>}/>
						<Route exact path="/login" component={LoginContainer}/>
						<Route exact path="/signup" component={SignupContainer}/>
						<Route exact path="/my-network" component={MyNetworkContainer}/>
						<Route exact path="/my-network/admin-account" component={ManageAccountForm}/>
						<Route exact path="/invitation/accept" component={AcceptInvitation}/>
						<Route exact path="/account-global/add" component={AccountForm}/>
						<Route exact path="/profile/password-change" component={PasswordChangeForm}/>
					</React.Fragment>
				</Router>
			</Provider>
		)
	}
}

Root.propTypes = {
	store: PropTypes.object.isRequired
}

export default Root;