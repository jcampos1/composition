import React from 'react';
import globalAxios from 'config/api/index';
import AccountNetwork from 'components/MyNetwork/components/AccountNetwork/index';
import { withNamespaces } from 'react-i18next';

class MyNetwork extends React.Component {
    componentDidMount() {
        globalAxios.get('/account-global/account_global_in_use/')
            .then(response => {
                this.props.saveAccountGlobalInUse(response.data);
            });
    }

    render() {
        const { accountGlobalInUse, t } = this.props;

        if (accountGlobalInUse === null)
            return <div className="text-uppercase">{t('loading')}</div>

        if (accountGlobalInUse.parent === null || accountGlobalInUse.children.length === 0)
            return (
                <div className="container">
    				<label className="d-block">
    					{t('my_network.children_zero_share')}
    				</label>
    				<div className="input-group mb-3">
					  <input 
					  	type="text" 
					  	className="form-control" 
					  	placeholder="1123group.com/redandresospina/xp3456812" 
					  	aria-label="Username" 
					  	aria-describedby="basic-addon1"/>
					  	<div className="input-group-prepend">
						    <span className="input-group-text" id="basic-addon1">Edit</span>
						</div>
					</div>
					<button className="btn btn-primary btn-lg d-block m-auto">{t('my_network.share_code')}</button>
    			</div>
            )

        return (
        	<React.Fragment>
        		<div className="row p-3 border-bottom">
        			<div className="col-sm-8">
	        			<label className="d-block">
	    					{t('my_network.children_share')}
	    				</label>
	    			</div>
	    			<div className="col-sm">
	    				<button className="btn btn-primary btn-lg d-block m-auto">{t('my_network.share_code')}</button>
	    			</div>
        		</div>
        		<div className="row p-3">
                	<div className="col-sm-4 text-uppercase">
                		{t('my_network.community')}
                	</div>
                	<div className="col-sm">
                		PP
                	</div>
                	<div className="col-sm">
                		PG
                	</div>
                	<div className="col-sm text-uppercase">
                		{t('my_network.level')}
                	</div>
                	<div className="col-sm">
                	</div>
                </div>
                {
                	accountGlobalInUse.children.map((child, index) => 
                		<AccountNetwork
                			key={`child${index}`} 
	        				accountGlobal={child}/>
                	)
                }
	        </React.Fragment>
        )
    }
}

export default withNamespaces()(MyNetwork);