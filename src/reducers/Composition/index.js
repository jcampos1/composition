import * as types from 'reducers/Composition/types/index';

const INITIAL_STATE = {
	selectedContinent: null
}

const compositionReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
  	case types.SET_CONTINENT:
  		return {
  			...state,
  			selectedContinent: action.continent
  		};
    default: return state;
  }
}

export default compositionReducer;