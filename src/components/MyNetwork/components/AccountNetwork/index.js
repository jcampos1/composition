import React from 'react';
import globalAxios from 'config/api/index';
import PropTypes from 'prop-types';

class AccountNetwork extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showChildren: false,
            accountGlobal: this.props.accountGlobal
        };
    }

    handleToggleShowChildren = () => {
        const { accountGlobal } = this.state;
        this.setState({
            showChildren: !this.state.showChildren
        }, () => {
            if (this.state.showChildren && accountGlobal.children === undefined) {
                globalAxios.get(`/account-global/${accountGlobal.id}/`)
                    .then(response => {
                        this.setState({
                            accountGlobal: {
                                ...this.state.accountGlobal,
                                children: response.data.children
                            }
                        })
                    })
            }
        });
    }

    render() {
        const { accountGlobal, showChildren } = this.state;
        const { level } = this.props;

        return (
            <React.Fragment>
                <div className={`row border`}>
                    <div className="col-sm-4">
                        <img 
                            src="https://via.placeholder.com/60" 
                            alt={`user ${accountGlobal.user}`}
                            className="d-inline-block rounded mr-2"/>
                            <label className="d-inline-block">{accountGlobal.name}</label>
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
                                <button 
                                    className="btn btn-raised"
                                    onClick={this.handleToggleShowChildren}>
                                    {showChildren ? '-' : '+'}
                                    {accountGlobal.number_of_children}
                                </button>
                        }
                    </div>
                </div>
                {
                    showChildren && accountGlobal.children && accountGlobal.children.map((child, index) => 
                        <AccountNetwork
                            key={`child${child.id}`} 
                            accountGlobal={child} 
                            level={level+1}/>
                    )
                }
            </React.Fragment>
        )
    }
}

AccountNetwork.defaultProps = {
    level: 1
}

AccountNetwork.propTypes = {
    accountGlobal: PropTypes.object.isRequired,
    level: PropTypes.number
}

export default AccountNetwork;