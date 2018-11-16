import React from 'react';
import {shallow} from 'enzyme';
import Error from 'components/common/Error/index';

describe('Error component', () => {
	it('Should render Error component when errors is empty', () => {
		const errors = [];
		const wrapper = shallow(<Error errors={errors}/>);
		expect(wrapper).toMatchSnapshot();

		expect(wrapper.find("div.alert label")).toHaveLength(0);
	});

	it('Should render Error component when errors is not empty', () => {
		const errors = ["Unable to log in with provided credentials."];
		const wrapper = shallow(<Error errors={errors}/>);
		expect(wrapper).toMatchSnapshot();

		expect(wrapper.find("div.alert label")).toHaveLength(errors.length);
	});
});