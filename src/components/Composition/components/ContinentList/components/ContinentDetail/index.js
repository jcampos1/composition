import React from 'react';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import './styles/ContinentDetail.scss';


class ContinentDetail extends React.PureComponent {
	render() {
		const {t, continent} = this.props;

		return ( 
			<div className="continent_details position-absolute">
                <div className={`continent_details__container container border continent-${continent.key}`}>
                	<div className="continent_details__header position-relative">
                        <small className={`continent-${continent.key}`}>
                        	{t('continent.region')}
                        </small>
                        <h4 className={`continent-${continent.key} border-bottom`}>
                        	{continent.name}
                        </h4>
                        <div className={`circle circle-america continent-${continent.key} position-absolute border m-auto`}>
                            <h6 className="position-absolute">
                                {continent.ancestria_snp.split('.')[0]}
                                {
                                    continent.ancestria_snp.split('.')[1] && (
                                        <small className="continent__content__value__decimal">.{continent.ancestria_snp.split('.')[1]}</small>
                                    )
                                }
                                <small className="percentage">%</small>
                            </h6>
                         </div>
                    </div>
                    <ul className="list-group">
                    	<li className={`list-group-item continent-${continent.key}`}>
                            <small>{continent.name}</small>
                        </li>
                        {
                            continent.populations && continent.populations.map((population, index) => (
                                <li 
                                    key={`population${index}`}
                                    className={`list-group-item list-group-item-primary continent-${continent.key}`}>
                                    <span className="column_description d-inline-block">
                                        <small className="text-capitalize">{ population.name }</small>
                                    </span>
                                    <span className="column_value d-inline-block text-right">
                                        <small>{ population.result_percentage }%</small>
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
		)
	}
}

ContinentDetail.propTypes = {
    continent: PropTypes.shape({
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
  }).isRequired
};

export default withNamespaces()(ContinentDetail);