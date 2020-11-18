import React, {Component} from 'react';
import { connect } from 'react-redux';

import MasterSideBar from './SideBar/MasterSideBar';
import ItineraryData from './Segments/ItineraryData';
import moment from 'moment';

class MasterApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment().format('YYYY-MM-DD'),
            departures: [],
            operators: [],
            complete: false,
            isPolling: false,
            pollingCounter: 0
        };

        this.loadInitialData = this.loadInitialData.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.polling = this.polling.bind(this);
        this.stopPolling = this.stopPolling.bind(this);
        this.triggerDataLoad = this.triggerDataLoad.bind(this);
        this.startPollingTimer = this.startPollingTimer.bind(this);
    }

    async loadInitialData() {
        const origin = 'f2m673';
        const destination = 'f25dvk';
        const date = this.state.date;
        const pollingParameter = this.state.isPolling ? '/poll' : '';
        const indexParameter = this.state.isPolling && this.state.pollingCounter > 1 ? `?index=${this.state.departures.length}` : '';
        const fetchData = await fetch(`https://napi.busbud.com/x-departures/${origin}/${destination}/${date}${pollingParameter}${indexParameter}`, {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/n',
                'X-Busbud-Token': 'PARTNER_BaASYYHxTxuOINEOMWq5GA'
            }
        })
        const response = await fetchData.json();
        const complete = await response.complete;
        const departures = await response.departures;
        const operators = await response.operators;

        this.setState({ departures: departures, operators: operators, complete: complete })
    }

    polling() {
        let pollingCounter = this.state.pollingCounter;
        this.setState({ isPolling: true, pollingCounter: pollingCounter+1 }, () => this.loadInitialData());
    }

    stopPolling() {
        this.setState({ isPolling: false, pollingCounter: 0 });
    }

    startPollingTimer() {
        this.timer = setInterval(() => {
            if (this.state.complete) {
                this.stopPolling();
            } else {
                this.polling();
            }
        }, 2000);
    }

    triggerDataLoad() {
        this.loadInitialData();
        this.polling();
        this.startPollingTimer();
    }

    componentDidMount() {
        this.triggerDataLoad();
    }

    onDateChange(date) {
        this.timer = null;
        this.stopPolling();
        this.setState({ date: date }, () => {
            this.triggerDataLoad();
        })
    }

    componentWillUnmount() {
        this.timer = null;
    }

    render() {
        return (
            <div className="busApp">
                <div className="row">

                    <div className="col-4">
                        <MasterSideBar onDateChange={this.onDateChange}/>
                    </div>

                    <div className="col-8">

                        <ItineraryData
                            departures={this.state.departures} operators={this.state.operators}
                        />
                    </div>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        tripData: state.airTripReducer
    };
}

export default connect(mapStateToProps)(MasterApp);
