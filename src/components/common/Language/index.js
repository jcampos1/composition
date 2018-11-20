import React from 'react';
import i18n from 'i18n';
import {saveLanguage} from 'utils/localStorage/index';
import classNames from 'classnames';
import { withNamespaces } from 'react-i18next';
import './styles/language.css';

class Language extends React.Component {
	constructor (props) {
		super (props);

		this.state = {
			lng: i18n.language
		};

		this.changeLanguage = lng => this._changeLanguage.bind(this, lng);
	}

	_changeLanguage (lng) {
		i18n.changeLanguage(lng);
		saveLanguage(lng);
		this.setState({
			lng: lng
		});
	}

	render() {
		const {lng} = this.state;
		const {t} = this.props;

		return ( 
			<div className="language">
				<div className="language__img">
					<img src="/images/language-img.svg" width="26px" alt="language" />
				</div>
				<div className="language__title">
					<label>{t('language.title')}</label>
				</div>
				<div className="language__options">
					<label className={classNames({
							"language__options__btn-es": true,
							"language__options__btn-active": lng.indexOf('es') !== -1
						})} onClick={this.changeLanguage('es')}>
						<label>ES</label>
					</label>
	      			<label className={classNames({
							"language__options__btn-en": true,
							"language__options__btn-active": lng.indexOf('en') !== -1
						})} onClick={this.changeLanguage('en')}>
	      				<label>EN</label>
	      			</label>
	      		</div>
	      	</div>
		)
	}
}

export default withNamespaces()(Language);