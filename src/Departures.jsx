import React, { Component } from "react";
import { connect } from "react-redux";
import { t } from "./Translations.jsx";
import "./style/Departures.css";
import SearchBus from "./SearchBus.jsx";

class UnconnectedDepartures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      busResults: {}
    };
  }

  goBackToPreviousPage = event => {
    event.preventDefault();
    this.setState({ page: this.state.page - 1 });
  };

  goToNextPage = event => {
    event.preventDefault();
    this.setState({ page: this.state.page + 1 });
  };

  render = () => {
    let lng = this.props.language;
    return (
      <div className="global-container">
        <div className="search-bus-container">
          <div>
            {this.props.departures !== undefined && this.state.page > 0 ? (
              <button
                className="pagination-btn"
                onClick={this.goBackToPreviousPage}
              >
                {lng === "Fr" ? t("< back") : "< back"}
              </button>
            ) : null}
            {this.props.departures !== undefined &&
            this.props.departures.length / (this.state.page + 1) > 3 ? (
              <button className="pagination-btn" onClick={this.goToNextPage}>
                {lng === "Fr" ? t("next >") : "next >"}
              </button>
            ) : null}
          </div>
        </div>
        <div>
          {this.props.departures !== undefined &&
          this.props.operators !== undefined
            ? this.props.departures
                .slice(this.state.page * 3, this.state.page * 3 + 3)
                .map(bus => {
                  return (
                    <div className="departure-result-container">
                      {this.props.operators.map(op => {
                        if (op.id === bus.operator_id) {
                          return (
                            <div>
                              <div className="operator-price">
                                <b>{op.display_name.toUpperCase()}</b>
                                <br />
                                <div className="label-bus-results" id="price">
                                  {bus.prices.total}
                                  {" $" + bus.prices.currency.slice(0, 2)}
                                </div>{" "}
                              </div>
                              <div>
                                <div className="label-bus-results">
                                  {lng === "Fr"
                                    ? t("Departure time:")
                                    : "Departure time:"}{" "}
                                </div>
                                <div className="departure-arrival-result">
                                  {bus.departure_time
                                    .split("T")
                                    .join(" @ ")
                                    .slice(0, -3)}
                                  {" from " + this.state.origin}
                                </div>
                              </div>
                              <div>
                                <div className="label-bus-results">
                                  {lng === "Fr"
                                    ? t("Arrival time:")
                                    : "Arrival time:"}{" "}
                                </div>
                                <div className="departure-arrival-result">
                                  {bus.arrival_time
                                    .split("T")
                                    .join(" @ ")
                                    .slice(0, -3)}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  );
                })
            : null}
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    departures: state.departures,
    operators: state.operators,
    language: state.language
  };
};

let Departures = connect(mapStateToProps)(UnconnectedDepartures);
export default Departures;
