import { combineReducers } from 'redux';
import myNetworkReducer from './MyNetwork/index';
import userReducer from 'reducers/User/index';

export default combineReducers({
  myNetworkReducer,
  userReducer
});