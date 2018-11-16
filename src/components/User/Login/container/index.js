import { connect } from 'react-redux';
import Login from 'components/User/Login/index';

const mapStateToProps = state => ({
	isAuthenticated: state.userReducer.isAuthenticated
}); 

const mapDispatchToProps = dispatch => ({
});

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginContainer;