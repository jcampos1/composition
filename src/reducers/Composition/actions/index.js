import * as types from 'reducers/Composition/types/index';

export const setContinent = continent => {
	return {
		type: types.SET_CONTINENT,
		continent
	}
}