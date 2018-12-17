import React from 'react';
import Footer from 'components/common/Footer/index';
import Loading from 'components/common/Loading/index';
import HeaderContainer from 'components/common/Header/container/index';
import ContinentListContainer from 'components/Composition/components/ContinentList/container/index';
import { withNamespaces } from 'react-i18next';
import globalAxios from 'config/api/index';
import './styles/Composition.scss';

class Composition extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            continents: null
        };
    }

    componentDidMount() {
        globalAxios.get('/continents')
            .then(({data}) => {
                // Creo un nuevo arreglo solo para que aparezcan los elementos en el mismo orden que en el diseño
                let america = data.find(({name}) => name === "America");
                america.key = "america";
                let europa = data.find(({name}) => name === "Europa");
                europa.key = "europa";
                let africa = data.find(({name}) => name === "Africa");
                africa.key = "africa";
                let asia = data.find(({name}) => name === "Asia");
                asia.key = "asia";
                let oceania = data.find(({name}) => name === "Oceania");
                oceania.key = "oceania";
                this.setState({
                    continents: [america, europa, africa, asia, oceania]
                });
            })
            .catch(errors => {
                console.log(errors);
            });
    }

	render() {
        const { continents } = this.state;
        const { t, selectedContinent } = this.props;

        if ( continents === null )
            return(<Loading />);

		return (
			<React.Fragment>
				<HeaderContainer/>
				<div className="composition container-fluid h-auto pr-0">
                    <div className="row">
                        <div className="composition__continent_list col-sm-4 pr-0 position-relative pb-4">
                            <ContinentListContainer continents={continents} />
                            <button className="btn btn-primary btn-sm d-block m-auto dropdown-toggle" type="button">
                                <small>{t('continent_list.show_report')}</small>
                            </button>
                        </div>
                        <div className="composition__ancestral col-sm">
                            <div className="container border-top border-bottom py-4 position-relative">
                                <h2>{t('composition.title')}</h2>
                                <div className="composition__ancestral__text pb-2">
                                    <p className="text-justify pr-4">
                                        {t('composition.p')}
                                    </p>
                                    <div className={`circle continent-${selectedContinent ? selectedContinent.key : 'america'} border`}>
                                        <h4>
                                            {
                                                selectedContinent ? selectedContinent.ancestria_snp : '100'
                                            }
                                            <small className="percentage">%</small>
                                        </h4>
                                    </div>
                                </div>
                                <div className="composition__ancestral_progress_bar border mb-2" />
                                <div className="composition__ancestral__buttons text-right position-absolute">
                                    <button className="btn btn-sm dropdown-toggle" type="button">
                                        <small>{t('composition.share')}</small>
                                    </button>
                                    <button className="btn btn-sm dropdown-toggle" type="button">
                                        <small>{t('composition.print')}</small>
                                    </button>
                                </div>
                            </div>
                            <div className="composition__ancestral__map position-relative h-100">
                                <img 
                                    src="/images/map-base.svg" 
                                    alt="Map Base"
                                    className={`position-absolute composition__ancestral__map-${selectedContinent ? selectedContinent.key : ''}`} />
                                <img 
                                    src="/images/ett-focus.png" 
                                    alt="Focus"
                                    className="position-absolute" />
                            </div>
                        </div>
                    </div>
				</div>
                <Footer />
			</React.Fragment>
		);
	}
}

export default withNamespaces()(Composition);