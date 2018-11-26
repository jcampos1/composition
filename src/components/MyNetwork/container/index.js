import { connect } from 'react-redux';
import MyNetwork from 'components/MyNetwork/index';
import {saveAccountGlobalInUse} from 'reducers/MyNetwork/actions/index';

const mapStateToProps = state => ({
	accountGlobalInUse: state.myNetworkReducer.accountGlobalInUse
}); 

const mapDispatchToProps = dispatch => ({
	saveAccountGlobalInUse: accountGlobalInUse => { dispatch(saveAccountGlobalInUse(accountGlobalInUse)) }
});

const MyNetworkContainer = connect(mapStateToProps, mapDispatchToProps)(MyNetwork);
export default MyNetworkContainer;