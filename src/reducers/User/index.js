import * as types from 'reducers/User/types/index';
import {getToken} from 'utils/localStorage/index';

const INITIAL_STATE = {
	isAuthenticated: getToken() != null,
	pageSignupWizard: 0
}

const userReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
  	case types.SET_AUTHENTICATED:
  		return {
  			...state,
  			isAuthenticated: true
  		};
  	case types.CHANGE_PAGE_SIGNUP_WIZARD:
  		return {
  			...state,
  			pageSignupWizard: action.page
  		};
    default: return state;
  }
}

export default userReducer;