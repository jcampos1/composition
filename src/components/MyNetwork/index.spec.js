import React from 'react';
import {shallow} from 'enzyme';
import MyNetwork from './index';

describe('MyNetwork component', () => {
	it('Should render MyNetwork component', () => {
		const wrapper = shallow(<MyNetwork />);
		expect(wrapper).toMatchSnapshot();
	});
});