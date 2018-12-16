import React from 'react';
import PropTypes from 'prop-types';

class Error extends React.PureComponent {

    render() {
        const { errors } = this.props;

        if (errors.length === 0)
            return null;

        return (
            <div className="alert alert-danger" role="alert">
                {
                    errors.map((error, index) => (
                        <label key={`error${index}`}>{error}</label>
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