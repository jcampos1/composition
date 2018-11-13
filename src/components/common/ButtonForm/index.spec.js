import React from 'react';
import {shallow} from 'enzyme';
import ButtonForm from 'components/common/ButtonForm/index';

describe('ButtonForm component', () => {
	it('Should render ButtonForm component when is not loading', () => {
		const name = "Log in";
		const nameLoading = "Logging in";

		const wrapper = shallow(<ButtonForm name={name} nameLoading={nameLoading}/>);
		expect(wrapper).toMatchSnapshot();

		expect(wrapper.find("Fragment button[type='submit']").contains(name)).toEqual(true);
	});

	it('Should render ButtonForm component when is loading', () => {
		const isLoading = true;
		const name = "Log in";
		const nameLoading = "Logging in";

		const wrapper = shallow(<ButtonForm isLoading={isLoading} name={name} nameLoading={nameLoading}/>);
		expect(wrapper).toMatchSnapshot();

		expect(wrapper.find("Fragment button[disabled=true]").contains(nameLoading)).toEqual(true);
	});
});