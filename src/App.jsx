import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import createReactClass from 'create-react-class';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import moment from 'moment-timezone';
import { translate } from 'react-i18next';
import emojiFlags  from 'emoji-flags';
import MomentFr from './components/MomentFr.js';
import MomentEn from './components/MomentEn.js';
import AppActions from './actions/AppActions.js';
import AppStore from './store/AppStore.js';
import Loader from './components/Loader.jsx';
import ResultList from './components/ResultList.jsx';
import SearchForm from './components/SearchForm.jsx';
import './App.css';
const _ = require('lodash');
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  fontFamily: 'Fira Sans',
});

const App = createReactClass({
  getInitialState() {
		return {
      results: {},
      isLoading: false
		};
  },

  componentWillMount() {
		AppStore.addChangeListener(this._onResultChange);
		AppStore.addLoaderListener(this._isLoadingChange);
	},
	componentWillUnmount() {
		AppStore.removeChangeListener(this._onResultChange);
		AppStore.removeLoaderListener(this._isLoadingChange);
	},

  _isLoadingChange(){
    this.setState({isLoading: AppStore.isLoading()});
  },

  _onResultChange() {
    const results = AppStore.getAllResults();
    const cityFrom = {
      name: results.cities[0].name,
      image: results.cities[0].image_url,
      timezone: results.cities[0].timezone
    };
    const cityTo = {
      name: results.cities[1].name,
      image: results.cities[1].image_url,
      timezone: results.cities[1].timezone
    };

    const travels = [];
    for(const myDeparture of results.departures){
      const originLocation = _.find(results.locations, {id:myDeparture.origin_location_id});
      const destinationLocation = _.find(results.locations, {id:myDeparture.destination_location_id});
      const operator = _.find(results.operators, {id:myDeparture.operator_id});
      travels.push({
        departure: { 
          time: myDeparture.departure_time, 
          timezone: myDeparture.departure_timezone,
          location: { name: originLocation.name, address: originLocation.address }
        },
        arrival: { 
          time: myDeparture.arrival_time, 
          timezone: myDeparture.arrival_timezone,
          location: { name: destinationLocation.name, address: destinationLocation.address }
        },
        operator:{
          name: operator.display_url,
          logo: operator.logo_url
        },
        price: {
          amount: myDeparture.prices.total,
          currency: myDeparture.prices.currency
        }
      });
    }

		this.setState({
			results: {
        cityFrom,
        cityTo,
        travels,
        travelDate: results.travelDate
      }
    });
  },
  
  _getResults(from, to, when){
    AppActions.fetchAll(from, to, when);
  },

  _formatDateTime(myDate, myLanguage, showTime = false){
    if( myLanguage === 'en'){
      moment.updateLocale('en', MomentEn);
    }else{
      moment.updateLocale('fr', MomentFr);
    } 
    if(showTime){
      return moment(myDate).format('LLLL');
    }
    return moment(myDate).format('LL');
  },

  render() {
    const { t, i18n } = this.props;
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };
    // console.log('render app');console.log(this.props);
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <div className="App-header">
            <img src="images/osheaga.png" className="logo-osheaga hidden-sm-down" alt="Osheaga" />
            <img src="images/osheaga.png" className="logo-osheaga logo-small hidden-md-up" alt="Osheaga" />
            {t('Header.By')}
            <img src="images/busbud.png" className="logo-busbud hidden-sm-down" alt="Busbud" />
            <img src="images/busbud.png" className="logo-busbud logo-small hidden-md-up" alt="Busbud" />
            <div className="language-buttons">
              <span onClick={() => changeLanguage('fr')}>{emojiFlags.countryCode('FR').emoji}</span> &nbsp;
              <span onClick={() => changeLanguage('en')}>{emojiFlags.countryCode('US').emoji}</span>
            </div>
          </div>
          { this.state.isLoading && <Loader/>}
          <SearchForm getResults={this._getResults} formatDateTime={this._formatDateTime} /> 
          <ResultList 
            results={this.state.results} 
            isLoading={this.state.isLoading} 
            formatDateTime={this._formatDateTime} 
          /> 
        </div>
      </MuiThemeProvider>
    );
  },
});

export default translate('translations')(App);
