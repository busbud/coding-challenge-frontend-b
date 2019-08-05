import React from 'react';
import i18n from "../i18n";
import ResultItem from "./ResultItem";

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: props.search.origin,
      destination: props.search.destination,
      outboundDate: props.search.outboundDate,
      numAdults: props.search.numAdults,
      currency: "USD",
      currencySymbol: "$",
      isLoaded: false,
      items: [],
      complete: false,
      numRows: 0,
      rowsHtml: []
    };
  }

  componentDidMount() {
    // query the API for rows every 3 seconds until "complete" (i.e. all are rows fetched)
    this.timer = setInterval(() => {
      if (!this.state.complete) {
        const requestOptions = {
          headers: { 'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
                    'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w' }
        };

        var url = (this.state.numRows === 0) ?
            `https://napi.busbud.com/x-departures/${this.state.origin}/${this.state.destination}/${this.state.outboundDate}?adult=${this.state.numAdults}&currency=${this.state.currency}`
            :
            `https://napi.busbud.com/x-departures/${this.state.origin}/${this.state.destination}/${this.state.outboundDate}/poll?adult=${this.state.numAdults}&currency=${this.state.currency}&index=${this.state.numRows}`;

        fetch(url, requestOptions)
        .then(res => res.json())
        .then((result) => {
            // get incrRowHtml, i.e. html for rows incrementally fetched in the current query to the API
            var incrRowsHtml = [];
            for (var i=0; i < result.departures.length; i++)
            {
              const resultItem = {
                departure_time: result.departures[i].departure_time,
                arrival_time: result.departures[i].arrival_time,
                location: result.locations[i].name,
                price: result.departures[i].prices.total,
                currency: this.state.currency,
                currencySymbol: this.state.currencySymbol
              };

              incrRowsHtml.push(
                <ResultItem item={resultItem}/>
              )
            }

            // set state
            this.setState(() => ({
              isLoaded: true,
              items: result,
              complete: result.complete,
              numRows: this.state.numRows + result.departures.length,
              rowsHtml: this.state.rowsHtml.concat(incrRowsHtml)
            }));
          })
        .catch(console.log);
      }
    }, 3000);
  }

  componentDidUnmount() {
    clearInterval(this.timer);
  }

  render() {
    if (!this.state.complete) {
      return <div>{i18n.t('Loading')}...</div>;
    }
    else {
      var rowsHtml;
      if (this.state.rowsHtml.length === 0) {
        rowsHtml = (
          <strong>{i18n.t('No departures found')}.</strong>
        );
      }
      else {
        rowsHtml =  this.state.rowsHtml;
      }
      return (
        <div class="departure-list">
          {rowsHtml}
        </div>
      );
    }
  }
}
