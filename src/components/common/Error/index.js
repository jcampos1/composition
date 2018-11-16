import React from 'react';
import PropTypes from 'prop-types';

class Error extends React.PureComponent {
    render() {
        const {errors} = this.props;

        if ( errors.length === 0)
            return null;

        return (
            <div className="alert alert-danger" role="alert">
                {
                    errors.map((error2, index) => (
                        <label key={`error_login{index}`}>{error2}</label>
                    ))
                }
            </div>
        )
    }
}

Error.propTypes = {
    errors: PropTypes.array.isRequired
}

export default Error;