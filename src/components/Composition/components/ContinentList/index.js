import React from 'react';
import { withNamespaces } from 'react-i18next';
import ContinentContainer from 'components/Composition/components/ContinentList/components/Continent/container/index';
import ContinentDetail from 'components/Composition/components/ContinentList/components/ContinentDetail/index';
import PropTypes from 'prop-types';
import './styles/ContinentList.css';

class ContinentList extends React.PureComponent {
	render() {
        const { t, selectedContinent, continents } = this.props;

		return (
            <div className="continent_list container border position-relative shadow-sm rounded px-2 pb-2">
                <div className="continent_list_content pt-4">
                	<p className="continent_list_content__text text-center">
                		<small>{t('continent_list.p')}</small>
                	</p>
                	<div className="position-relative">
                		{
                			selectedContinent && (
                				<ContinentDetail continent={selectedContinent} />
                			)
                		}
	                	{
	                		continents.map((continent, index) => (
	                			<ContinentContainer 
	                				key={`continent_list_element${index}`}
	                				continent={continent} />
	                		))
	                	}
                	</div>
                </div>
            </div>
		);
	}
}

ContinentList.propTypes = {
    continents: PropTypes.array.isRequired
};

export default withNamespaces()(ContinentList);