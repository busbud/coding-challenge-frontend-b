import React, { Component } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import { initialFetch, poll } from '../api/service';
import { parseDepartures } from '../api/parser';
import { delay } from '../utils/utils';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchParams: {
        origin: 'dr5reg',
        destination: 'f25dvk',
        date: new Date(Date.UTC(2018, 10, 19))
      },
      isLoading: false,
      departures: [],
      error: null
    }
  }

  componentDidMount() {
    this.startDeparturesFetch();
  }

  handleApiError(err) {
    const msg = `Error during api call: \n${err.message}`;
    console.error(msg, err);
    this.setState({
      error: msg,
      isLoading: false,
    });
  };

  handleSearchClick(origin, destination, date) {
    this.setState({
      searchParams: {
        origin: origin,
        destination: destination,
        date: date,
      },
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
        return this.pollDepartures(10);
      }
      this.setState({ isLoading: false });

    }).catch(this.handleApiError.bind(this));
  }

  pollDepartures(iterations) {
    let iterator = iterations;

    return poll({
      ...this.state.searchParams,
      index: this.state.departures.length,
    }).then(newData => {

      console.info(`poll #${iterator} has completed.`, newData);
      this.setState(prevState => {
        return {
          departures: prevState.departures.concat(parseDepartures(newData)) ,
        };
      });

      iterator -= 1;
      if (iterator > 0 && !newData.complete) {
        return delay(1500).then(() => this.pollDepartures(iterator));
      }
      this.setState({ isLoading: false });
    });
  }

  render() {
    return (
      <div className="App">
        <Header
          searchParams={this.state.searchParams}
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

export default App;
