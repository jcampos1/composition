import React from 'react';
import i18n from 'i18n';
import {saveLanguage} from 'utils/localStorage/index';

class Language extends React.Component {
	constructor (props) {
		super (props);

		this.changeLanguage = lng => this._changeLanguage.bind(this, lng);
	}

	_changeLanguage (lng) {
		i18n.changeLanguage(lng);
		saveLanguage(lng);
	}

	render() {
		return ( 
			<React.Fragment>
				<button onClick={this.changeLanguage('es')}>es</button>
      			<button onClick={this.changeLanguage('en')}>en</button>
      		</React.Fragment> 
		)
	}
}

export default Language;