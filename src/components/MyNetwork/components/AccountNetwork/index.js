import React from 'react';
import globalAxios from 'config/api/index';
import PropTypes from 'prop-types'; 

class AccountNetwork extends React.Component {
    constructor(props) {
        super(props);
    }

    handleToggleShowChildren = accountGlobal =>
        console.log(accountGlobal);


    render() {
    	const {accountGlobal} = this.props;
    	
        return (
            <div className="row">
                <div className="col-sm-4">
                    <img 
                        src="https://via.placeholder.com/60" 
                        alt="image user"
                        className="d-inline-block rounded mr-2"/>
                        <label className="d-inline-block">{accountGlobal.user}</label>
                </div>
                <div className="col-sm">
                    {accountGlobal.personal_points}
                </div>
                <div className="col-sm">
                    {accountGlobal.group_points}
                </div>
                <div className="col-sm">
                    {accountGlobal.percentage_level}
                </div>
                <div className="col-sm">
                    {
                        accountGlobal.number_of_children > 0 &&
                            <button className="btn btn-raised">
                                +{accountGlobal.number_of_children}
                            </button>
                    }
                </div>
            </div>

        )
    }
}

AccountNetwork.propTypes = {
    accountGlobal: PropTypes.object.isRequired
}

export default AccountNetwork;