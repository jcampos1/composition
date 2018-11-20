import React from 'react';
import PropTypes from 'prop-types';

class Error extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: []
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.errors !== this.props.errors) {
            const { errors } = this.props;

            let errs = [];
            Object.keys(errors).map(key => {
                errs.push(errors[key]);
                return key;
            });

            this.setState({
                errors: errs
            });
        }
    }

    render() {
        const { errors } = this.state;

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
    errors: PropTypes.object.isRequired
}

export default Error;