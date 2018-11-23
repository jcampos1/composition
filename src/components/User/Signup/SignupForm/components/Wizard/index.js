import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import { withNamespaces } from 'react-i18next';
import ButtonForm from 'components/common/ButtonForm/index';
import globalAxios from 'config/api/index';
import {saveToken} from 'utils/localStorage/index';
import Error from 'components/common/Error/index';

export class Wizard extends React.Component {
    static Page = ({ children }) => children;

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            errors: {},
            page: 0,
            values: props.initialValues || {}
        };

        this.createUser = this.createUser.bind(this);
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
        return activePage.props.validate ?
            activePage.props.validate(values) : {};
    }

    createUser = values => {
        const {isAuthenticated} = this.props;

        if(!isAuthenticated){
          this.setState({
              isLoading: true
          }, () => {
              const data = {
                first_name: values['first_name'],
                last_name: values['last_name'],
                email: values['email'],
                password1: values['password1'],
                password2: values['password2'],
              };

              globalAxios.post('/accounts/signup/', data)
                  .then(response => {
                      // Save token in local storage
                      saveToken(response.data.key);
                      this.setState({
                          isLoading: false,
                          errors: {}
                      }, () => {
                        this.next(values);
                      });
                      this.props.setAuthenticated();
                  })
                  .catch(errors => {
                      this.setState({
                          isLoading: false,
                          errors: errors.response.data
                      });
                  });
          });
        } else
          this.next(values);
    }

    createGlobalAccount = values => {
      this.setState({
            isLoading: true
        }, () => {
            const data = {
              name: values['name']
            };

            globalAxios.post('/account-global/', data)
                .then(response => {
                    alert("Account global created. Redirect?");
                    this.setState({
                        isLoading: false,
                        errors: {}
                    });
                })
                .catch(errors => {
                    this.setState({
                        isLoading: false,
                        errors: errors.response.data
                    });
                });
        });
    }

    handleSubmit = values => {
        const { children } = this.props;
        const { page } = this.state;
        const isLastPage = page === React.Children.count(children) - 1;
        if (isLastPage)
            this.createGlobalAccount(values);
        else
            this.createUser(values);
    }

    render() {
        const { children, t } = this.props;
        const { page, values, isLoading, errors } = this.state;
        const activePage = React.Children.toArray(children)[page];
        const isLastPage = page === React.Children.count(children) - 1;

        return (
            <Form
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}>
        {({ handleSubmit, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            <Error errors={errors} />
            {activePage}
            <React.Fragment>
              {
                !isLastPage && 
                <ButtonForm 
                    name={t('wizard.create_user')} 
                    nameLoading={t('wizard.create_user_loading')}
                    isLoading={isLoading}/>
              }
              <div className="row">
                {page > 0 && (
                  <div className="col">
                    <button 
                      className="btn btn-raised" 
                      type="button" 
                      onClick={this.previous}>
                      {t('wizard.previous')} 
                    </button>
                  </div>
                )}
                {
                  isLastPage && (
                    <div className="col">
                      <ButtonForm 
                        name={t('wizard.network_account')} 
                        nameLoading={t('wizard.network_account_loading')}/>
                    </div>
                  )
                }
              </div>
            </React.Fragment>
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