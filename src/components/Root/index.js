import React from 'react';
import {Provider} from 'react-redux';
import PropTypes from 'prop-types';
import MyNetwork from 'components/MyNetwork/index';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Root extends React.PureComponent {
	render() {
		const {store} = this.props;
		return(
			<Provider store={store}>
				<Router>
					<Route path="/" component={MyNetwork}/>
				</Router>
			</Provider>
		)
	}
}

Root.propTypes = {
	store: PropTypes.object.isRequired
}

export default Root;