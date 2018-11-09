import React from 'react';
import {saveToken} from 'utils/localStorage/index';
import globalAxios from 'api/index';
import axios from 'axios';

class MyNetwork extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<h1>
				My Network Component
			</h1>
		)
	}
}

export default MyNetwork;