import axios from "axios";
import format from "date-fns/format";

import "sanitize.css";

import Meta from "../components/Meta";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import Results from "../components/Results";
import Loading from "../components/Loading";
import NoResults from "../components/NoResults";
import Footer from "../components/Footer";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
      locations: [],
      departures: [],
      operators: [],
      initialised: false,
      complete: false,
      origin: "dr5reg",
      destination: "f25dvk",
      outbound_date: new Date("August 1, 2019")
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentWillUnmount() {
    // clear any existing poll requests
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
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

  fetchData(origin, destination, outbound_date, polling = false) {
    const { departures } = this.state;
    const formattedDate = format(outbound_date, "YYYY-MM-DD");
    const params =
      polling && departures.length > 0
        ? `/poll?adult=1&index=${departures.length}`
        : `?adult=1`;
    const url = `${
      process.env.BUSBUD_ENDPOINT
    }x-departures/${origin}/${destination}/${formattedDate}${params}`;
    const headers = {
      Accept:
        "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
      "X-Busbud-Token": process.env.BUSBUD_TOKEN
    };

    axios
      .get(url, { headers })
      .then(response => {
        const { data } = response;
        // console.log(data);
        this.setState(prevState => ({
          cities: data.cities
            ? [...prevState.cities, ...data.cities]
            : prevState.cities,
          locations: data.locations
            ? [...prevState.locations, ...data.locations]
            : prevState.locations,
          departures: data.departures
            ? [...prevState.departures, ...data.departures]
            : prevState.departures,
          operators: data.operators
            ? [...prevState.operators, ...data.operators]
            : prevState.operators,
          complete: data.complete
        }));

        // poll API for further updates
        if (!data.complete) {
          this.timeout = setTimeout(() => {
            this.fetchData(origin, destination, outbound_date, true);
            this.timeout = null;
          }, 2000);
        }
      })
      .catch(error => console.log(error));
  }

  handleSubmit(event) {
    const { origin, destination, outbound_date } = this.state;

    event.preventDefault();

    // clear any existing poll requests
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    // reset search data and set initialised to true
    this.setState({
      cities: [],
      locations: [],
      departures: [],
      operators: [],
      complete: false,
      initialised: true
    });

    this.fetchData(origin, destination, outbound_date, false);
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
      initialised,
      complete
    } = this.state;

    return (
      <React.Fragment>
        <Meta />
        <Header>
          <SearchForm
            handleInputChange={this.handleInputChange}
            handleDateChange={this.handleDateChange}
            handleSubmit={this.handleSubmit}
            origin={origin}
            destination={destination}
            outbound_date={outbound_date}
          />
        </Header>
        {!initialised ? <NoResults /> : null}
        {initialised && !complete ? <Loading /> : null}
        {departures.length > 0 ? (
          <Results
            cities={cities}
            locations={locations}
            departures={departures}
            operators={operators}
          />
        ) : null}

        <Footer />
        <style jsx global>{`
          html {
            box-sizing: border-box;
          }
          body {
            background-image: linear-gradient(
              -180deg,
              #50c4c9,
              #7cc9d0 21%,
              #c882a8 50%,
              #dd7794 61%,
              #ec9c5f 81%,
              #e79d53
            );
            font-family: "Poppins", sans-serif;
            margin: 0;
            padding: 0;
          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-family: "Changa One";
            font-weight: 400;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default Index;
