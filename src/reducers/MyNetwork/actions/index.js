import * as types from 'reducers/MyNetwork/types/index';

export const saveAccountGlobalInUse = accountGlobalInUse => {
	return {
		type: types.SAVE_ACCOUNT_GLOBAL_IN_USE,
		accountGlobalInUse
	}
}