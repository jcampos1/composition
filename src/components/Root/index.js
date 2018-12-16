import React from 'react';
import {Provider} from 'react-redux';
import PropTypes from 'prop-types';
import LoginContainer from 'components/User/Login/container/index';
import Signup from 'components/User/Signup/index';
import CompositionContainer from 'components/Composition/container/index';
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
						<Route exact path="/signup" component={Signup}/>
						<Route exact path="/composition" component={CompositionContainer}/>
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