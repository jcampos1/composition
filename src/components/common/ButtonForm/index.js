import React from 'react';
import PropTypes from 'prop-types';

class ButtonForm extends React.PureComponent {
	render() {
		const {isLoading, name, nameLoading} = this.props;

		return (
			<React.Fragment>
			{
				isLoading ? ( 
					<button className="btn btn-primary my-2 btn-block btn-sm" type="submit" disabled={true}>{nameLoading}...</button>
				) : (
					<button className="btn btn-primary btn-block btn-sm" type="submit">{name}</button>
				)
			}
			</React.Fragment>
		)
	}
}

ButtonForm.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	nameLoading: PropTypes.string.isRequired,
}

ButtonForm.defaultProps = {
	isLoading: false
}

export default ButtonForm;