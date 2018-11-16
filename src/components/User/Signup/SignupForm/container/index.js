import { connect } from 'react-redux';
import SignupForm from 'components/User/Signup/SignupForm/index';
import {setAuthenticated} from 'reducers/User/actions/index';

const mapStateToProps = state => ({
}); 

const mapDispatchToProps = dispatch => ({
	setAuthenticated: () => { dispatch(setAuthenticated()) }
});

const SignupFormContainer = connect(mapStateToProps, mapDispatchToProps)(SignupForm);
export default SignupFormContainer;