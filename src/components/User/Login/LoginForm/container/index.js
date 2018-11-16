import { connect } from 'react-redux';
import LoginForm from 'components/User/Login/LoginForm/index';
import {setAuthenticated} from 'reducers/User/actions/index';

const mapStateToProps = state => ({
}); 

const mapDispatchToProps = dispatch => ({
	setAuthenticated: () => { dispatch(setAuthenticated()) }
});

const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);
export default LoginFormContainer;