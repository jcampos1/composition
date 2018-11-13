import { combineReducers } from 'redux';
import myNetworkReducer from './MyNetwork/index';
import userReducer from 'reducers/User/index';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  myNetworkReducer,
  userReducer,
  form: formReducer
});