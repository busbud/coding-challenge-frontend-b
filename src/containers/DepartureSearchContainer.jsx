import React, { Component } from 'react';

//Actions
import DepartureAction from '../actions/DepartureAction';

//Stores
import DepartureStore from '../stores/DepartureStore';

//Components
import DepartureSearch from '../components/DepartureSearch';

const query = {
    origin:'dr5reg',
    destination: 'f25dvk',
    outbound_date: '2018-08-02'
};

class DepartureSearchContainer extends Component {

  state = {
    loading: false,
    departures : []
  }

  onFetchDepartures = () => {
    DepartureAction.initialSearchDepartures(query)
  }

  componentDidMount = () => {
    DepartureStore.addChangeListener(this.onChange)
  }

  componentWillUnmount = () => {
    DepartureStore.removeChangeListener(this.onChange)  
  }

  onChange = () => {

      //If its not completed, call the poll action.
      if (DepartureStore.isComplete()) {
          
        this.setState({
            departures: DepartureStore.getDepartures(),
            loading:false
          });

      } else {
        
        this.setState({loading:true})  
        
        setTimeout(function(){ 
            DepartureAction.pollDepartures(query)
        }, 5000);  

      }
 
  }

  render() {
    return (
      <DepartureSearch 
        loading={this.state.loading}
        departures={this.state.departures}
        onFetchDepartures={this.onFetchDepartures}
      />
    );
  }
}

export default DepartureSearchContainer;