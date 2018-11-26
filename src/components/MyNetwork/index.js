import React from 'react';
import globalAxios from 'config/api/index';
import AccountNetwork from 'components/MyNetwork/components/AccountNetwork/index';

class MyNetwork extends React.Component {
    componentDidMount() {
        globalAxios.get('/account-global/account_global_in_use/')
            .then(response => {
                this.props.saveAccountGlobalInUse(response.data);
            });
    }

    render() {
        const { accountGlobalInUse } = this.props;

        if (accountGlobalInUse === null)
            return <div>LOADING ...</div>

        if (accountGlobalInUse.children.length === 0)
            return (
                <div className="container">
    				<label className="d-block">
    					Comparte el siguiente link con las personas que quieres agregar a tu red.
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
					<button className="btn btn-primary btn-lg d-block m-auto">Compartir código</button>
    			</div>
            )

        return (
        	<React.Fragment>
        		<div className="row p-3 border-bottom">
        			<div className="col-sm-8">
	        			<label className="d-block">
	    					Comparte el código con mas personas e incrementa la comunidad de tu red
	    				</label>
	    			</div>
	    			<div className="col-sm">
	    				<button className="btn btn-primary btn-lg d-block m-auto">Compartir código</button>
	    			</div>
        		</div>
        		<div className="row p-3 align-middle">
                	<div className="col-sm-4">
                		COMMUNITY
                	</div>
                	<div className="col-sm">
                		PP
                	</div>
                	<div className="col-sm">
                		PG
                	</div>
                	<div className="col-sm">
                		LEVEL
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

export default MyNetwork;