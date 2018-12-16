import { connect } from 'react-redux';
import Composition from 'components/Composition/index';

const mapStateToProps = state => ({
	selectedContinent: state.compositionReducer.selectedContinent
}); 

const mapDispatchToProps = dispatch => ({
});

const CompositionContainer = connect(mapStateToProps, mapDispatchToProps)(Composition);
export default CompositionContainer;