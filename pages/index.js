import axios from "axios";
import format from "date-fns/format";

import Meta from "../components/Meta";
import SearchForm from "../components/SearchForm";
import Results from "../components/Results";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
      locations: [],
      operators: [],
      departures: [],
      complete: null,
      origin: "dr5reg",
      destination: "f25dvk",
      outbound_date: new Date("August 1, 2019")
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleDateChange(date) {
    this.setState({
      outbound_date: date
    });
  }

  formatDate(date) {
    return format(date, "YYYY-MM-DD");
  }

  fetchData() {
    const { origin, destination, outbound_date, departures } = this.state;
    const formattedDate = this.formatDate(outbound_date);
    const params =
      departures.length > 0
        ? `/poll?adult=1&index=${departures.length}`
        : `?adult=1`;
    const url = `${
      process.env.BUSBUD_ENDPOINT
    }x-departures/${originGeohash}/${destinationGeohash}/${formattedDate}${params}`;
    const headers = {
      Accept:
        "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
      "X-Busbud-Token": process.env.BUSBUD_TOKEN
    };

    axios
      .get(url, { headers })
      .then(response => {
        this.setState(prevState => ({
          cities: response.data.cities
            ? [...prevState.cities, ...response.data.cities]
            : prevState.cities,
          locations: response.data.locations
            ? [...prevState.locations, ...response.data.locations]
            : prevState.locations,
          departures: response.data.departures
            ? [...prevState.departures, ...response.data.departures]
            : prevState.departures,
          operators: response.data.operators
            ? [...prevState.operators, ...response.data.operators]
            : prevState.operators,
          complete: response.data.complete
        }));
        if (!response.data.complete) {
          setTimeout(() => {
            this.fetchData(true);
          }, 2000);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.fetchData();
  }

  render() {
    const {
      cities,
      locations,
      operators,
      departures,
      origin,
      destination,
      outbound_date,
      complete
    } = this.state;

    return (
      <div>
        <Meta />
        <p>Osheaga Bus Search</p>
        <SearchForm
          handleInputChange={this.handleInputChange}
          handleDateChange={this.handleDateChange}
          handleSubmit={this.handleSubmit}
          origin={origin}
          destination={destination}
          outbound_date={outbound_date}
        />
        {departures.length > 0 ? (
          <Results
            cities={cities}
            locations={locations}
            departures={departures}
            operators={operators}
          />
        ) : null}
        {complete === false ? <p>Loading...</p> : null}
      </div>
    );
  }
}

export default Index;
