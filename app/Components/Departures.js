var React = require('react');

module.exports = React.createClass({
  displayName: 'Departures',

  getIndexWithId: function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
  },

  render: function() {
    <div className="departures">
      { this.props.travelData.departures.map( function(ele, ind){
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
                    {this.props.travelData.locations[ this.getIndexWithId( this.props.travelData.locations, 'id', ele.origin_location_id) ].name}
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
  }

});