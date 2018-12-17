import * as types from 'reducers/Composition/types/index';

export const setContinent = continent => {
	return {
		type: types.SET_CONTINENT,
		continent
	}
}

export const addPopulations = populations => {
	return {
		type: types.ADD_POPULATION,
		populations
	}
}

