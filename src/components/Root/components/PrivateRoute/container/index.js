import { connect } from 'react-redux';
import Signup from 'components/Root/Signup/index';

const mapStateToProps = state => ({
	isAuthenticated: state.userReducer.isAuthenticated
}); 

const mapDispatchToProps = dispatch => ({
});

const SignupContainer = connect(mapStateToProps, mapDispatchToProps)(Signup);
export default SignupContainer;