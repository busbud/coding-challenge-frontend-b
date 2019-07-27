import Head from "next/head";
import axios from "axios";

import SearchForm from "../components/SearchForm";
import Results from "../components/Results";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      origin: "dr5reg",
      destination: "f25dvk",
      outbound_date: "2019-08-01"
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { origin, destination, outbound_date } = this.state;
    const url = `${
      process.env.ENDPOINT
    }x-departures/${origin}/${destination}/${outbound_date}`;
    axios
      .get(url, {
        headers: {
          Accept:
            "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
          "X-Busbud-Token": process.env.TOKEN
        }
      })
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { data, origin, destination, outbound_date } = this.state;

    return (
      <div>
        <Head>
          <title>Osheaga | Bus Search</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <p>Osheaga Bus Search</p>
        <SearchForm
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
          origin={origin}
          destination={destination}
          outbound_date={outbound_date}
        />
        {data ? <Results data={data} /> : null}
      </div>
    );
  }
}

export default Index;
