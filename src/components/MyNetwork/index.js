import React from 'react';
import globalAxios from 'config/api/index';
import AccountNetwork from 'components/MyNetwork/components/AccountNetwork/index';
import { withNamespaces } from 'react-i18next';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getDomain } from 'utils/index';

class MyNetwork extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            links: [],
            linkToCopy: '',
            copied: false
        };

        this.handleChangeLink = this.handleChangeLink.bind(this);
    }

    handleChangeLink(event) {
        this.setState({
            linkToCopy: event.target.value,
            copied: false
        });
    }

    afterCopy = () =>
        this.setState({
            copied: true
        });

    componentDidMount() {
        globalAxios.get('/account-global/account_global_in_use/')
            .then(response => {
                this.props.saveAccountGlobalInUse(response.data);
            });

        globalAxios.get('/link/')
            .then(response => {
                const data = response.data.map((obj, index) =>
                    getDomain().concat(`/account-global/add/?link=${obj.account_global.id_hash}`))

                this.setState({
                    links: data,
                    linkToCopy: data.length > 0 ?
                        data[0] :
                        ''
                });
            });
    }

    render() {
        const { links, linkToCopy, copied } = this.state;
        const { accountGlobalInUse, t } = this.props;

        if (accountGlobalInUse === null)
            return <div className="text-uppercase">{t('loading')}</div>

        if (accountGlobalInUse.parent === null || accountGlobalInUse.children.length === 0)
            return (
                <div className="container">
                    <label className="d-block">
                        {t('my_network.children_zero_share')}
                    </label>
                    <div className="input-group mb-3">
                        <select 
                            className="form-control" 
                            id="linkToShare"
                            onChange={this.handleChangeLink}>
                            {
                                links.map((link, index) => (
                                    <option 
                                        key={`option1_${index}`}
                                        value={link}>
                                        {link}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <CopyToClipboard 
                        text={linkToCopy}
                        onCopy={this.afterCopy}>
                      <button className="btn btn-primary btn-lg d-block m-auto">
                        {!copied ? t('my_network.share_code') : 'Copied!'}
                        </button>
                    </CopyToClipboard>
                </div>
            )

        return (
            <React.Fragment>
                <div className="row p-3 border-bottom">
                    <div className="col-sm-8">
                        <label className="d-block">
                            {t('my_network.children_share')}
                        </label>
                        <select 
                            className="form-control" 
                            id="linkToShare"
                            onChange={this.handleChangeLink}>
                            {
                                links.map((link, index) => (
                                    <option 
                                        key={`option1_${index}`}
                                        value={link}>
                                        {link}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-sm">
                        <CopyToClipboard 
                            text={linkToCopy}
                            onCopy={this.afterCopy}>
                            <button className="btn btn-primary btn-lg d-block m-auto">
                                {!copied ? t('my_network.share_code') : 'Copied!'}
                            </button>
                        </CopyToClipboard>
                    </div>
                </div>
                <div className="row p-3">
                    <div className="col-sm-4 text-uppercase">
                        {t('my_network.community')}
                    </div>
                    <div className="col-sm">
                        PP
                    </div>
                    <div className="col-sm">
                        PG
                    </div>
                    <div className="col-sm text-uppercase">
                        {t('my_network.level')}
                    </div>
                    <div className="col-sm">
                    </div>
                </div>
                {
                    accountGlobalInUse.children.map((child, index) => 
                        <AccountNetwork
                            key={`child${index}`} 
                            accountGlobal={child}/>
                    )
                }
            </React.Fragment>
        )
    }
}

export default withNamespaces()(MyNetwork);