import React from 'react';
import PropTypes from 'prop-types';
import './styles/SignupFormTabs.scss';
import classNames from 'classnames';

class SignupFormTabs extends React.Component {
	render() {
		const {page, tabs} = this.props;
		return (
			<div className="signup_form__tabs border-bottom">
				{
					tabs.map((tab, index) => (
						<div key={`signup_form__tab${index}`} className={classNames({
							"signup_form__tabs__data d-inline-block": true,
							"border-right": (index+1) < tabs.length,
							"signup_form__tabs__data--disabled": index !== page
						})}>
							<div className="signup_form__tabs__number_page mr-2">{index+1}</div>
							<label>{tab.title}</label>
						</div>
					))
				}
			</div>
		)
	}
}

SignupFormTabs.propTypes = {
	page: PropTypes.number.isRequired,
	tabs: PropTypes.array.isRequired
}

SignupFormTabs.defaultProps = {
	page: 0
}

export default SignupFormTabs;