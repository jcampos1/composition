import React from 'react';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles/Continent.scss';

class Continent extends React.Component {
    constructor(props) {
        super(props);

        this.handleSelectContinent = continent => this._handleSelectContinent.bind(this, continent);
    }

    _handleSelectContinent = data => 
        this.props.setContinent(data);


	render() {
        const { t, continent, selectedContinent } = this.props;
        const { key } = continent;
        const selected = selectedContinent != null;

		return (
            <div className={classNames({
                [`continent continent-${key} rounded position-relative`]: true,
                'continent-unselected': selected && selectedContinent.key !== key
            })}>
                <div className="row p-1">
                    <div className="col-sm position-relative">
                        <div className={classNames({
                            [`continent__img continent__img-${continent.key} position-relative`]: true,
                            'continent__img-unselected': selected && selectedContinent.key !== key
                        })}/>
                        {
                            selected && selectedContinent.key !== key && (
                                <div 
                                    className="continent__img_description position-absolute"
                                    onClick={this.handleSelectContinent(continent)}>
                                        <div className={`circle circle-${key} position-relative border d-block m-auto`}>
                                            <h6 className="position-absolute">
                                                {"23.2".split('.')[0]}
                                                {
                                                    "23.2".split('.')[1] && (
                                                        <small className="continent__content__value__decimal">.{"23.2".split('.')[1]}</small>
                                                    )
                                                }
                                                <small className="percentage">%</small>
                                            </h6>
                                         </div>
                                         <h5>{continent.name}</h5>
                                </div>
                            )
                        }
                    </div>
                    <div className="col-sm-8 continent__content p-2 position-relative">
                        <div className={classNames({
                            [`continent__content__description continent__content__description-${key} d-inline-block`]: true,
                            'continent__content-unselected': selected
                        })}>
                            <small className="continent__content__description__geo">{t('continent.region')}</small>
                            <h5>{continent.name}</h5>
                            <button
                                type="submit" 
                                className="btn btn-block btn-sm dropdown-toggle"
                                onClick={this.handleSelectContinent(continent)}>
                                <small>{t('continent.details')}</small>
                            </button>
                        </div>
                        <div className={classNames({
                            "continent__content__value d-inline-block position-absolute": true,
                            'continent__content-unselected': selected
                        })}>
                            <div className={`circle circle-${key} position-absolute`}>
                                <h4>
                                    {"23.2".split('.')[0]}
                                    {
                                        "23.2".split('.')[1] && (
                                            <small className="continent__content__value__decimal">.{"23.2".split('.')[1]}</small>
                                        )
                                    }
                                    <small className="percentage">%</small>
                                </h4>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
		);
	}
}

Continent.propTypes = {
    continent: PropTypes.shape({
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
  }).isRequired
};

export default withNamespaces()(Continent);