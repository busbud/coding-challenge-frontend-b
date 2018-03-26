import React, { Component } from 'react';
import { Layout, Card, Row, Col, Button, Icon } from 'antd';
import moment from 'moment';
import axios from 'axios';

import busbudLogo from './busbud-logo-for-white-background.png';
import osheagaLogo from './osheaga_logo.png';

import './App.css';

const { Header, Content, Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      departures: [],
      loading: true,
      complete: false,
      // query params
      origin: 'dr5reg',
      destination: 'f25dvk',
      date: '2018-08-24' // *** change this
    };
  }

  componentWillMount() {
    this.initializeSearch()
      .then(res => {
        console.log('Complete?', res.complete);
        this.setState(
          {
            locations: res.locations,
            departures: res.departures,
            complete: res.complete
          },
          () => {
            if (!this.state.complete) {
              setTimeout(() => {
                this.pollSearch();
              }, 750);
            }
          }
        );
      })
      .catch(err => console.log(err));
  }

  initializeSearch = async () => {
    const response = await axios.get('/api/departures', {
      params: {
        origin: this.state.origin,
        destination: this.state.destination,
        date: this.state.date
      }
    });
    const body = await response.data;

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  pollSearch = async () => {
    console.log('running poll search');
    axios
      .get('/api/departures/poll', {
        params: {
          origin: this.state.origin,
          destination: this.state.destination,
          date: this.state.date
        }
      })
      .then(res => {
        console.log('poll res', res);
        this.setState(
          {
            locations: [...this.state.locations, ...res.data.locations],
            departures: [...this.state.departures, ...res.data.departures],
            complete: res.data.complete
          },
          () => {
            if (!this.state.complete) {
              setTimeout(() => {
                this.pollSearch();
              }, 2000);
            }
          }
        );
      });
  };

  render() {
    console.log(this.state.departures);
    return (
      <div className="App">
        <Layout>
          <Header>
            <div style={{ height: 200 }} />
          </Header>
          <Content>
            <Row type="flex">
              <Col
                span={24}
                style={{
                  backgroundColor: '#e7717f'
                  // height: 30
                }}
              >
                <Row type="flex" align="middle" justify="space-between">
                  <Col span={6} offset={2}>
                    <img
                      src={osheagaLogo}
                      alt="Osheaga festival logo"
                      style={{ width: '90%' }}
                    />
                  </Col>
                  <Col span={6}>
                    <img
                      src={busbudLogo}
                      alt="Busbud logo"
                      style={{ width: '110%' }}
                    />
                  </Col>
                  <Col span={1} />

                  <Col span={4}>
                    <h3 style={{ color: 'white' }}>
                      {this.state.complete ? '' : <Icon type="loading" />}{' '}
                      {this.state.departuresIndex}
                      en | fr
                    </h3>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span={12}>
                {this.state.departures.map(departure => {
                  let destination = this.state.locations.find(
                    item => item.id === departure.destination_location_id
                  );
                  let origin = this.state.locations.find(
                    item => item.id === departure.origin_location_id
                  );
                  return (
                    <Card
                      key={departure.id}
                      title="Departure"
                      extra={
                        <Button type="primary" href={departure.links.deeplink}>
                          Book now
                        </Button>
                      }
                      style={{ margin: 20 }}
                    >
                      <p>
                        Departure from {origin.name}:{' '}
                        {moment(departure.departure_time).format('LT')}
                      </p>
                      <p>
                        Arrival at {destination.name}:{' '}
                        {moment(departure.arrival_time).format('LT')}
                      </p>
                      <p>
                        Journey time: {Math.floor(departure.duration / 60)}h{' '}
                        {departure.duration % 60}m
                      </p>
                      <p>
                        Price:{' '}
                        {(departure.prices.total / 100).toLocaleString(
                          'en-US',
                          {
                            style: 'currency',
                            currency: 'USD'
                          }
                        )}{' '}
                        {departure.prices.currency}
                      </p>
                    </Card>
                  );
                })}
              </Col>
            </Row>
          </Content>
          <Footer style={{ color: 'white' }}>Made in Montreal</Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
