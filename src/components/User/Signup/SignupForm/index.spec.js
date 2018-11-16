import React from 'react';
import {shallow} from 'enzyme';
import {LoginForm} from 'components/User/Login/LoginForm/index';
import sinon from 'sinon';

describe('LoginForm component', () => {
	it('Should render LoginForm component when there are errors', () => {
		const handleSubmit = sinon.spy();
		const isLoading = false;
		const errors = ["Unable to log in with provided credentials."]; 

		const wrapper = shallow(
			<LoginForm 
				handleSubmit={handleSubmit} 
				isLoading={isLoading}
				errors={errors} />);

		expect(wrapper).toMatchSnapshot();
	});
});