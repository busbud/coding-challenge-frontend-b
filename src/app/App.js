import React, { Component } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import parseDepartures from '../api/parser';
import { initialFetch, poll } from '../api/service';
import { delay } from '../utils/utils';
import { translate } from 'react-i18next';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchParams: {
        origin: 'dr5reg',
        destination: 'f25dvk',
        date: new Date(Date.UTC(2018, 8, 1))
      },
      language: props.i18n.language,
      isLoading: false,
      isMenuActive: false,
      departures: [],
      error: null
    };
  }

  componentDidMount() {
    this.startDeparturesFetch();
  }

  handleApiError(err) {
    const { t } = this.props;
    const msg = t('msg.error_api');
    console.error(msg, err);
    this.setState({
      error: msg,
      isLoading: false,
    });
  };

  handleLanguageChange(lang_id) {
    this.setState({ language: lang_id });
    this.props.i18n.changeLanguage(lang_id);
  }

  handleMenuClick() {
    this.setState(prevState => ({ isMenuActive: !prevState.isMenuActive }));
  }

  handleSearchClick(origin, destination, date) {
    this.setState({
      searchParams: {
        origin: origin,
        destination: destination,
        date: date,
      },
      isMenuActive: false,
      departures: [],
      error: null,
    }, () => this.startDeparturesFetch());
  }

  startDeparturesFetch() {
    this.setState({ isLoading: true });

    initialFetch(this.state.searchParams).then((initialData) => {

      console.info('initial fetch has completed.', initialData);
      this.setState({
        departures: parseDepartures(initialData),
      });

      if (!initialData.complete) {
        return this.pollDepartures(5);
      }
      this.setState({ isLoading: false });

    }).catch(this.handleApiError.bind(this));
  }

  pollDepartures(iterations) {
    let countdown = iterations;

    return poll({
      ...this.state.searchParams,
      index: this.state.departures.length,
    }).then(newData => {

      console.info(`poll #${countdown} has completed.`, newData);
      this.setState(prevState => {
        return {
          departures: prevState.departures.concat(parseDepartures(newData)) ,
        };
      });

      countdown -= 1;
      if (countdown > 0 && !newData.complete) {
        return delay(2000).then(() => this.pollDepartures(countdown));
      }
      this.setState({ isLoading: false });
    });
  }

  render() {
    return (
      <div className="App">
        <Header
          currentLang={this.state.language}
          isMenuActive={this.state.isMenuActive}
          searchParams={this.state.searchParams}
          onLanguageClick={this.handleLanguageChange.bind(this)}
          onMenuClick={this.handleMenuClick.bind(this)}
          onSearchClick={this.handleSearchClick.bind(this)}
        />
        <MainSection
          currentSearch={this.state.searchParams}
          departures={this.state.departures}
          error={this.state.error}
          isLoading={this.state.isLoading}
        />
        <Footer/>
      </div>
    );
  }
}

export default translate()(App);
