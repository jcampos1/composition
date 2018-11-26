import * as types from 'reducers/MyNetwork/types/index';

const INITIAL_STATE = {
	accountGlobalInUse: null
};

const myNetworkReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
  	case types.SAVE_ACCOUNT_GLOBAL_IN_USE:
  		return {
  			...state,
  			accountGlobalInUse: action.accountGlobalInUse
  		};
    default: return state;
  }
}

export default myNetworkReducer;