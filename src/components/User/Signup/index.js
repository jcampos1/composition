import React from 'react';
import SignupForm from 'components/User/Signup/SignupForm/index';
import Footer from 'components/common/Footer/index';
import HeaderContainer from 'components/common/Header/container/index';
import globalAxios from 'config/api/index';

class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            errors: [],
            isCreated: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = data => {
        this.setState({
            isLoading: true
        }, () => {
            globalAxios.post('/users/', data)
                .then(response => {
                    this.setState({
                        isLoading: false,
                        errors: [],
                        isCreated: true
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

	render() {
		const { errors, isLoading, isCreated } = this.state;

		return (
			<React.Fragment>
				<HeaderContainer/>
				<div className="user_content w-100 h-auto position-relative">
					<div className="p-3 user_content__form position-relative">
						<SignupForm 
							onSubmit={this.handleSubmit}
							errors={errors}
							isLoading={isLoading}
							isCreated={isCreated} />
					</div>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

export default Signup;