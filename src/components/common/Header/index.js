import React from 'react';
import { withNamespaces } from 'react-i18next';
import Language from 'components/common/Language/index';
import globalAxios from 'config/api/index';
import { removeToken, removeUser } from 'utils/localStorage/index';
import { withRouter } from 'react-router-dom';
import './styles/Header.css';


class Header extends React.Component {
	constructor(props) {
        super(props);

        this.handleLogout = this._handleLogout.bind(this);
    }

    _handleLogout = () => {
    	globalAxios.post('/custom-users/logout').then( response => {
    		removeToken();
    		removeUser();
    		this.props.logout();
    		this.props.history.push("/login");
    	})
    	.catch( errors => {
    		console.log(errors);
    	});
    }

	render() {
		const {t, isAuthenticated, user} = this.props;

		return ( 
			<header className="header container-fluid">
				<div className="header__language">
					<Language/>
				</div>
				<img 
					className="header__img_map"
					src="/images/map-base.svg" alt="map base"/>

				{
					!isAuthenticated ? (
						<img 
							className="header__img_lab" width="150"
							src="/images/ett-laboratory.png" alt="Laboratory" />
					) : (
						<div className="header__welcome">
							<div className="circle border">
								<h3 className="header__welcome__first_name d-inline-block">
									{user.first_name[0]}
								</h3>
								<h3 className="header__welcome__last_name d-inline-block">
									{user.last_name[0]}
								</h3>
							</div>
							<div className="header__welcome__user">
								<small className="header__welcome__user__hello">
									{t('header.hello')}&nbsp;
								</small>
								<h2>
									<span className="header__welcome__first_name">
										{user.first_name}
									</span>
									&nbsp;
									<span className="header__welcome__last_name">
										{user.last_name}
									</span>
								</h2>
								<a href="#" className="d-block text-right" onClick={this.handleLogout}>
									<small className="font-italic">({t('header.logout')})</small>
								</a>
							</div>
						</div>
					)
				}
			</header>
		)
	}
}

export default withRouter(withNamespaces()(Header));