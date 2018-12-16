import { connect } from 'react-redux';
import Header from 'components/common/Header/index';
import {logout} from 'reducers/User/actions/index';

const mapStateToProps = state => ({
	isAuthenticated: state.userReducer.isAuthenticated,
	user: state.userReducer.user
}); 

const mapDispatchToProps = dispatch => ({
	logout: () => { dispatch(logout()) }
});

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);
export default HeaderContainer;