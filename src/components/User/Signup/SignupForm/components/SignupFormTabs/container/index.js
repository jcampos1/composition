import { connect } from 'react-redux';
import SignupFormTabs from 'components/User/Signup/SignupForm/components/SignupFormTabs/index';

const mapStateToProps = state => ({
	page: state.userReducer.pageSignupWizard
}); 

const mapDispatchToProps = dispatch => ({
});

const SignupFormTabsContainer = connect(
	mapStateToProps, 
	mapDispatchToProps
)(SignupFormTabs);

export default SignupFormTabsContainer;