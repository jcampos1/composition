import { combineReducers } from 'redux';
import myNetworkReducer from './MyNetwork/index';
import userReducer from 'reducers/User/index';
import compositionReducer from 'reducers/Composition/index';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  myNetworkReducer,
  userReducer,
  compositionReducer,
  form: formReducer
});