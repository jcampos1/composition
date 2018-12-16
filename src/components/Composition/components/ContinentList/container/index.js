import { connect } from 'react-redux';
import ContinentList from 'components/Composition/components/ContinentList/index';

const mapStateToProps = state => ({
	selectedContinent: state.compositionReducer.selectedContinent
}); 

const mapDispatchToProps = dispatch => ({
});

const ContinentListContainer = connect(mapStateToProps, mapDispatchToProps)(ContinentList);
export default ContinentListContainer;