import React from 'react';
import LoginForm from 'components/User/Login/LoginForm/index';
import { Redirect } from 'react-router-dom';
import HeaderContainer from 'components/common/Header/container/index';
import Footer from 'components/common/Footer/index';
import { REDIRECT_PARAMETER } from 'constants/index';
import { getRedirectUrl, getParseQueryParams } from 'utils/index';
import globalAxios from 'config/api/index';
import { saveToken, saveUser } from 'utils/localStorage/index';

class Login extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            errors: []
        };

        this.handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(data) {
        this.setState({
            isLoading: true
        }, () => {
            globalAxios.post('/custom-users/login', data)
                .then(response => {
                	// Save token in local storage
                	saveToken(response.data.id);
                	globalAxios.get(`/custom-users/${response.data.userId}`)
                		.then(response => {
                			this.setState({
		                        isLoading: false,
		                        errors: []
		                    });
		                    // Save user in local storage
                			saveUser(response.data);
                			this.props.setUser(response.data);
		                    this.props.setAuthenticated();
                		})
                		.catch(errors => {
		                    this.setState({
		                        isLoading: false,
		                        errors: [errors.response.data.error.message]
		                    });
		                });
                })
                .catch(errors => {
                    this.setState({
                        isLoading: false,
                        errors: [errors.response.data.error.message]
                    });
                });
        });
    }

    getUrlToRedirect = () =>
        getParseQueryParams()[REDIRECT_PARAMETER]
			? getRedirectUrl()
			: "/composition"

    render() {
        const { errors, isLoading } = this.state;
        const { isAuthenticated } = this.props;

        if (isAuthenticated)
            return <Redirect to={this.getUrlToRedirect()} />

        return (
            <React.Fragment>
				<HeaderContainer />
				<div className="user_content w-100 h-auto position-relative">
					<div className="p-3 user_content__form position-relative">
						<LoginForm 
							onSubmit={this.handleSubmit}
							errors={errors}
							isLoading={isLoading} />
					</div>
				</div>
				<Footer />
			</React.Fragment>
        );
    }
}

export default Login;