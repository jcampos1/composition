import { connect } from 'react-redux';
import Continent from 'components/Composition/components/ContinentList/components/Continent/index';
import {setContinent} from 'reducers/Composition/actions/index';

const mapStateToProps = state => ({
	selectedContinent: state.compositionReducer.selectedContinent
}); 

const mapDispatchToProps = dispatch => ({
	setContinent: continent => { dispatch(setContinent(continent)) }
});

const ContinentContainer = connect(mapStateToProps, mapDispatchToProps)(Continent);
export default ContinentContainer;