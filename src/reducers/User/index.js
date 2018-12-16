import * as types from 'reducers/User/types/index';
import {getToken, getUser} from 'utils/localStorage/index';

const INITIAL_STATE = {
	isAuthenticated: getToken() != null,
  user: getUser()
}

const userReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
  	case types.SET_AUTHENTICATED:
  		return {
  			...state,
  			isAuthenticated: true
  		};
  	case types.LOGOUT:
  		return {
  			...state,
  			isAuthenticated: false
  		};
    case types.SET_USER:
      return {
        ...state,
        user: action.user
      };
    default: return state;
  }
}

export default userReducer;