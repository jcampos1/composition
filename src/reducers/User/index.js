import * as types from 'reducers/User/types/index';
import {getToken} from 'utils/localStorage/index';

const INITIAL_STATE = {
	isAuthenticated: getToken() != null
}

const userReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
  	case types.SET_AUTHENTICATED:
  		return {
  			...state,
  			isAuthenticated: true
  		};
    default: return state;
  }
}

export default userReducer;