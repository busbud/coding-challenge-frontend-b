import React            from 'react'
import ReactTooltip     from 'react-tooltip'
import moment           from 'moment'
import API              from './API.jsx'
import Departure        from './Departure.jsx'
import LoadingAnimation from './LoadingAnimation.jsx'

class DepartureList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      results: { departures: [], loading: true },
      config: this.props.config
    };
    this.fetch = this.fetch.bind(this);
  }

  fetch() {

    if(this.refetchInterval) clearTimeout(this.refetchInterval);

      this.setState({
        error: false,
        loading: true
      });

    API
      .setConfig(this.state.config)
      .fetchDepartures({
        origin:        this.state.config.origin.geoHash,
        destination:   this.state.config.destination.geoHash,
        departureDate: this.state.config.departureDate,
        onData: function(data) {

          this.setState({ results: data })

        }.bind(this),
        onComplete: function(data) {

          this.refetchInterval = setTimeout(this.fetch, data.ttl*1000);
          this.setState({ loading: false });

        }.bind(this),
        onError: function(err) {

          this.setState({ error: err.error, loading: false })

        }.bind(this)
      })

  }

  componentDidUpdate() {
    ReactTooltip.rebuild()
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    
    if(this.state.error) {

      return (
        <div className="departureList">
          <div className="row">
            <div className="col-xs-12">
              <div className="errorBanner">
                {this.state.error} <button onClick={this.fetch}>Try again</button>
              </div>
            </div>
          </div>
        </div>
      );

    } else {
      
      var departures = this.state.results.departures.map(function(d, i) {
        return (
          <Departure key={d.id || i} data={d} config={this.state.config}/>
        )
      }.bind(this))

      return (
        <div className="departureList">
          {departures}
          <LoadingAnimation active={this.state.loading} />
        </div>
      )
    
    }
  }
}

export default DepartureList;