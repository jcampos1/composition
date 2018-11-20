import { connect } from 'react-redux';
import Wizard from 'components/User/Signup/SignupForm/components/Wizard/index';
import {changeWizardPage} from 'reducers/User/actions/index';

const mapStateToProps = state => ({
}); 

const mapDispatchToProps = dispatch => ({
	changeWizardPage: (page) => { dispatch(changeWizardPage(page)) }
});

const WizardContainer = connect(
	mapStateToProps, 
	mapDispatchToProps
)(Wizard);

export default WizardContainer;