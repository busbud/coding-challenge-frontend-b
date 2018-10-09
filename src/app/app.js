import React, { Component } from 'react';

import classnames from 'classnames';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import '../api/libs';

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import Layout from '../components/layout';
import { Departure } from '../components/departure';
import { CompressedDeparture } from '../components/compressedDeparture';

import { Translation, DEFAULT_LANGUAGE } from '../languages/lang';
import { timeout, geohashToCity } from '../api/service';
import { apiFetch } from '../api/ajax';
import { getDestination, compressedDepartureObj } from '../api/helper';

import { FormSearch } from '../components/formSearch';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const localStorage = window.localStorage;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            origin: 'dr5reg',
            destination: 'f25dvk',
            date: '2019-08-02', //yyyy-mm-dd
            departures: [],
            filters: [],
            fetchError: false,
            loading: true,
            activeTab: '1',
            submitted: false,
            pollingLoading: false
        };

        this.formSubmit = this.formSubmit.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
        this.toggleTab = this.toggleTab.bind(this);
    }
    componentWillMount() {
        let language = localStorage.getItem('lang') || DEFAULT_LANGUAGE;
        this.setState({
            activeTab: localStorage.getItem('activeTab') || '1'
        });
        this.setLanguage(language);
        this.fetch();
    }
    setLanguage(lang) {
        localStorage.setItem('lang', lang);
        Translation.setLanguage(lang);
        this.setState({
            filters: [
                {
                    id: 1,
                    name: Translation.lowestPrice
                },
                {
                    id: 2,
                    name: Translation.travelTime
                }
            ]
        }); //To force a particular language
    }
    formSubmit(e) {
        e.preventDefault();
        this.fetch();
    }
    fetch() {
        this.setState({
            loading: true,
            submitted: true
        });
        const api = {
            origin: this.state.origin,
            destination: this.state.destination,
            date: this.state.date
        };
        apiFetch(api, false, {
            adult: 1
        })
            .then(obj => {
                let departures = getDestination(obj);
                console.log('inital fetch: ', departures);

                this.setState({
                    departures: this.setDeparture(departures)
                });

                if (!obj.complete) {
                    this.poll(
                        obj.departures.length > 0 ? obj.departures.length : 10
                    );
                }

                this.setState({
                    loading: false,
                    submitted: false
                });
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    submitted: false,
                    fetchError: true
                });
            });
    }
    poll(initalResult) {
        const api = {
            origin: this.state.origin,
            destination: this.state.destination,
            date: this.state.date
        };
        this.setState({
            pollingLoading: true,
            submitted: true
        });
        apiFetch(api, true, {
            index: initalResult
        })
            .then(pollObj => {
                const newDepartures = getDestination(pollObj);
                console.log('poll: ', newDepartures);
                this.setState({
                    departures: this.setDeparture([
                        ...this.state.departures,
                        ...newDepartures
                    ])
                });
                if (!pollObj.complete) {
                    timeout(2500).then(() => this.poll(initalResult));
                }

                this.setState({
                    pollingLoading: false,
                    loading: false,
                    submitted: false
                });
            })
            .catch(ex => {
                this.setState({
                    pollingLoading: false,
                    loading: false
                });
            });
    }
    setDeparture(departures, sort = '') {
        const sorting = sort || this.state.sort;
        switch (sorting) {
            case 1:
                departures = departures.sort((a, b) => {
                    let nowTime = new Date(a.departureTime);
                    let nextTime = new Date(b.departureTime);
                    return a.price - b.price || nowTime - nextTime;
                });
                break;
            case 2:
                departures = departures.sort((a, b) => {
                    let nowTime = new Date(a.departureTime);
                    let nextTime = new Date(b.departureTime);
                    return (
                        a.totalDuration - b.totalDuration ||
                        a.price - b.price ||
                        nowTime - nextTime
                    );
                });
                break;
            default:
        }
        return departures;
    }
    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            localStorage.setItem('activeTab', tab);
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        const originCityName = geohashToCity(this.state.origin);
        const destinationCityName = geohashToCity(this.state.destination);
        const dateFormat = new Date(this.state.date).format(
            Translation.getLanguage() === 'en' ? 'DDD, MMM D' : 'DDD, D MMM.'
        );
        return (
            <Layout onChange={this.setLanguage}>
                <div id="wrap" className="container">
                    <div className="row">
                        <div className="col-lg-10 col-sm-12 offset-lg-1">
                            <FormSearch
                                origin={this.state.origin}
                                destination={this.state.destination}
                                date={this.state.date}
                                dateFormat={dateFormat}
                                submitted={this.state.submitted}
                                formSubmit={this.formSubmit}
                                originCityName={originCityName}
                                destinationCityName={destinationCityName}
                            />
                        </div>
                    </div>
                    <div className="tickets">
                        {this.state.pollingLoading && (
                            <div className="loading">
                                <img
                                    src="img/pollingloading.svg"
                                    alt={Translation.gettingMoreResults}
                                />{' '}
                                {Translation.gettingMoreResults}
                            </div>
                        )}
                        {this.state.loading ? (
                            <div className="loading">
                                <img
                                    src="img/loader.svg"
                                    alt={Translation.loading}
                                />{' '}
                                {Translation.loading}
                            </div>
                        ) : (
                            <div>
                                <Nav tabs className="layout-view">
                                    <NavItem>
                                        <NavLink
                                            className={classnames({
                                                active:
                                                    this.state.activeTab === '1'
                                            })}
                                            onClick={() => {
                                                this.toggleTab('1');
                                            }}>
                                            <FontAwesomeIcon icon="bars" />{' '}
                                            {Translation.view.list}
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({
                                                active:
                                                    this.state.activeTab === '2'
                                            })}
                                            onClick={() => {
                                                this.toggleTab('2');
                                            }}>
                                            <FontAwesomeIcon icon="th-large" />{' '}
                                            {Translation.view.compressed}
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <Departure
                                            originCityName={originCityName}
                                            destinationCityName={
                                                destinationCityName
                                            }
                                            origin={this.state.origin}
                                            destination={this.state.destination}
                                            date={this.state.date}
                                            dateFormat={dateFormat}
                                            filters={this.state.filters}
                                            departures={this.state.departures}
                                            setDeparture={this.setDeparture}
                                            fetchError={this.state.fetchError}
                                        />
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <CompressedDeparture
                                            departures={compressedDepartureObj(
                                                this.state.departures,
                                                Translation.getLanguage()
                                            )}
                                        />
                                    </TabPane>
                                </TabContent>
                            </div>
                        )}
                    </div>
                </div>
            </Layout>
        );
    }
}

export default App;
