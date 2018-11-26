import React from 'react';
import globalAxios from 'config/api/index';

class MyNetwork extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    	globalAxios.get('/account-global/account_global_in_use/')
    	.then(response => {
    		this.props.saveAccountGlobalInUse(response.data);
    	});
    }

    render() {
    	const {accountGlobalInUse} = this.props;
    	if (accountGlobalInUse === null)
    		return <div>LOADING ...</div>
    	
        return (<h1>My Network Component</h1>)
    }
}

export default MyNetwork;