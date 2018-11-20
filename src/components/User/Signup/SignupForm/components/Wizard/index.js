import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import { withNamespaces } from 'react-i18next';
import ButtonForm from 'components/common/ButtonForm/index';

export class Wizard extends React.Component {
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      values: props.initialValues || {}
    };
  }

  next = values => {
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }), () => {
      this.props.changeWizardPage(this.state.page);
    });
  }

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }), () => {
      this.props.changeWizardPage(this.state.page);
    });

  /**
 * NOTE: Both validate and handleSubmit switching are implemented
 * here because 🏁 Redux Final Form does not accept changes to those
 * functions once the form has been defined.
 */

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    return activePage.props.validate 
      ? activePage.props.validate(values) 
      : {};
  }

  handleSubmit = values => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values);
    } else {
      this.next(values);
    }
  }

  render() {
    const { children, t } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Form
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}>
        {({ handleSubmit, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            {activePage}
            <div className="buttons">
              {page > 0 && (
                <button type="button" onClick={this.previous}>
                  « Previous
                </button>
              )}
              {
                !isLastPage && 
                <ButtonForm 
                    name={t('wizard.next')} 
                    nameLoading={t('wizard.next')}/>
              }
              {
                isLastPage && (
                  <ButtonForm 
                    name={t('signup.signup_btn')} 
                    nameLoading={t('signup.signup_btn_loading')}/>
                )
              }
            </div>
          </form>
        )}
      </Form>
    )
  }
}

Wizard.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default withNamespaces()(Wizard);
