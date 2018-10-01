import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { format } from 'date-fns';
import './index.scss';
import Results from './components/Results';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '2019-08-02',
      origin: {
        label: 'New York',
        geohash: 'dr5reg',
      },
      destination: {
        label: 'Montréal',
        geohash: 'f25dvk',
      },
      passengers: {
        adults: 1,
        children: 0,
        seniors: 0,
      },
      lang: 'en_US',
      currency: 'USD',
      isLoading: true,
      data: {},
    };
  }

  componentDidMount() {
    const {
      date,
      origin,
      destination,
      passengers,
      lang,
      currency,
    } = this.state;

    const busbudClient = axios.create({
      baseURL: 'https://napi.busbud.com/',
      headers: {
        Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
        'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w',
      },
      timeout: 1000,
    });

    const getDepartures = () => {
      busbudClient
        .get(
          `/x-departures/${origin.geohash}/${destination.geohash}/${date}`,
          {
            params: {
              adult: passengers.adults,
              child: passengers.children,
              senior: passengers.seniors,
              lang,
              currency,
            },
          },
        )
        .then((res) => {
          if (res.data.complete === true) {
            this.setState({
              isLoading: false,
              data: res.data,
            });
          } else {
            setTimeout(getDepartures, 2000);
          }
        });
    };

    getDepartures();
  }

  render() {
    const {
      date,
      origin,
      destination,
      isLoading,
      data,
    } = this.state;
    return (
      <div>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">
                Busbud X Osheaga
              </h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h1 className="title is-4">
              {`From ${origin.label} to ${destination.label} on ${format(new Date(`${date}T12:00:00`), 'dddd, MMMM Do (YYYY)')}`}
            </h1>
            <Results isLoading={isLoading} data={data} />
          </div>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
