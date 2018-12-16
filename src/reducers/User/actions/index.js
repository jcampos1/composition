import * as types from 'reducers/User/types/index';

export const setAuthenticated = () => {
	return {
		type: types.SET_AUTHENTICATED
	}
}

export const logout = () => {
	return {
		type: types.LOGOUT
	}
}

export const setUser = user => {
	return {
		type: types.SET_USER,
		user
	}
}