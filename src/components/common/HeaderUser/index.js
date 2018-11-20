import React from 'react';
import {Link} from 'react-router-dom';
import Language from 'components/common/Language/index';
import './styles/HeaderUser.css';

class HeaderUser extends React.PureComponent {
	render() {
		return ( 
			<header className="header clearfix">
				<div className="header__language">
					<Language/>
				</div>
				<div className="header__logo">
					<Link to="/">
						<img src="/images/1123global-logo.png" alt="logo"/>
					</Link>
				</div>
			</header>
		)
	}
}

export default HeaderUser;