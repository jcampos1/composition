import { connect } from 'react-redux';
import Login from 'components/User/Login/index';
import {setAuthenticated, setUser} from 'reducers/User/actions/index';

const mapStateToProps = state => ({
	isAuthenticated: state.userReducer.isAuthenticated
}); 

const mapDispatchToProps = dispatch => ({
	setAuthenticated: () => { dispatch(setAuthenticated()) },
	setUser: user => { dispatch(setUser(user)) }
});

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginContainer;