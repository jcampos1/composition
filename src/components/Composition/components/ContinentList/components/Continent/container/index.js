import { connect } from 'react-redux';
import Continent from 'components/Composition/components/ContinentList/components/Continent/index';
import {setContinent, addPopulations} from 'reducers/Composition/actions/index';

const mapStateToProps = state => ({
	selectedContinent: state.compositionReducer.selectedContinent
}); 

const mapDispatchToProps = dispatch => ({
	setContinent: continent => { dispatch(setContinent(continent)) },
	addPopulations: populations => { dispatch(addPopulations(populations)) }
});

const ContinentContainer = connect(mapStateToProps, mapDispatchToProps)(Continent);
export default ContinentContainer;