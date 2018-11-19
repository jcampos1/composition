import React from 'react';
import './styles/Footer.scss';
import { withNamespaces } from 'react-i18next';


class Footer extends React.PureComponent {
	render() {
		const {t} = this.props;

		return ( 
			<footer className="footer row">
				<div className="footer__terms_and_conditions col-sm-6 col-xs-12">
					<label>{t('footer.policy')}</label> | <label>{t('footer.terms_and_conditions')}</label>
				</div>
				<div className="footer__copyright col-sm-6 col-xs-12">
					<label>{t('footer.year')}</label> | <label>{t('footer.copyright')}</label>
				</div>
			</footer>
		)
	}
}

export default withNamespaces()(Footer);