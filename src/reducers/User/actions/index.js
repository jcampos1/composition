import * as types from 'reducers/User/types/index';

export const setAuthenticated = () => {
	return {
		type: types.SET_AUTHENTICATED
	}
}

export const changeWizardPage = page => {
	return {
		type: types.CHANGE_PAGE_SIGNUP_WIZARD,
		page
	}
}