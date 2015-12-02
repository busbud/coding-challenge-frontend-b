var React = require('react');
var moment = require('moment');
var API_URL = "https://napi.busbud.com/x-departures/dr5reg/f25dvk/2016-01-14";
var miniBusPic = require('../Assets/bus.png')

var getIndexWithId = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
};

module.exports = React.createClass({
  displayName: 'Content',

  getInitialState: function() {
    return {
      travelData: {
        departures: [],
        locations: [],
        operators: []
      },
      showButton: true,
      showLoading: false
    }
  },

  requestTravelData: function(url){
    var xhr = new XMLHttpRequest();
    var actualURL = url===API_URL ? API_URL+'?adult=1&currency=usd' : url+'&adult=1&currency=usd'
    xhr.open('get', actualURL, true);
    xhr.setRequestHeader('Accept', 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/')
    xhr.onload = () => {
      var newData = JSON.parse(xhr.responseText);
      var currentData = url===API_URL ? newData : this.state.travelData;
      if(currentData.complete){
        this.setState({ travelData: currentData });
        this.setState({ showLoading: false });
        return;
      } 
      currentData.operators = currentData.operators.concat(newData.operators);
      currentData.departures = currentData.departures.concat(newData.departures);
      currentData.complete = newData.complete;
      this.setState({ travelData: currentData });
      console.log(currentData);
      this.requestTravelData(API_URL + '/poll?index=' + currentData.departures.length)
    }
    xhr.send();
  },

  onButtonClick: function(){
    this.setState({ showButton: false });
    this.setState({ showLoading: true });
    this.requestTravelData(API_URL);
  },

  render: function () {
    return (
      <div className="content-container">
        <div className="page-permanent-announcement">{'Hey New York! Busbud wants to get you to Igloofest.'}</div>
        <div className="on-boarding-section">
          { this.state.showButton ? <input className="the-button btn-default" ref='refreshButton' type='button' onClick={ this.onButtonClick } value='Click here to find a bus!'></input> : null}
          { this.state.showLoading ? <span className="glyphicon glyphicon-refresh spinning"></span> : null }
        </div>
        <div className="departures">
          { this.state.travelData.departures.map( function(ele, ind){
            return([
              <div key={ind} className="panel panel-primary departure-info-panel">
                <div className="panel-heading"><h3 className="panel-title">{'Bus '}{ind + 1}</h3></div>
                <div className="panel-body">
                  <div className="flex-row">
                    <div className="info-box">
                      {'Departure Time: '}
                      <span className="info-variable">
                        {moment(ele.departure_time, moment.ISO_8601).format('ddd, MMM Do YYYY, h:mm a')}
                      </span>
                    </div>
                    <div className="info-box">
                      {'Arrival Time: ' }
                      <span className="info-variable">
                        {moment(ele.arrival_time, moment.ISO_8601).format('ddd, MMM Do YYYY, h:mm a')}
                      </span>
                    </div>
                  </div>
                  <div className="flex-row">
                    <div className="info-box">
                      {'Location: ' }
                      <span className="info-variable">
                        {this.state.travelData.locations[ getIndexWithId( this.state.travelData.locations, 'id', ele.origin_location_id) ].name}
                      </span>
                    </div>
                    <div className="info-box">
                      {'Price: ' }
                      <span className="info-variable">
                        {'$' + ele.prices.total/100 + ' per adult'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="panel-footer">
                  <img className="mini-bus-pic" src={miniBusPic} />
                </div>
              </div>
            ]);
          }, this)}
        </div>
      </div>
    );
  }

});

// var TheButton = React.createClass({
//     render: function() {
//         return (
//             <div>
                
//             </div>
//         );
//     }
// });

//  