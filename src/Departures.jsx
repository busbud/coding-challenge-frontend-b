import React, { Component } from "react";
import { connect } from "react-redux";
import { t } from "./Translations.jsx";
import "./style/Departures.css";
import PaginationButtons from "./PaginationButtons.jsx";

class UnconnectedDepartures extends Component {
  render = () => {
    let lng = this.props.language;
    return (
      <div className="global-container">
        <PaginationButtons />
        <div>
          {this.props.departures
            .slice(this.props.page * 3, this.props.page * 3 + 3)
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
                              {" from " + this.props.origin}
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
            })}
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    departures: state.departures,
    operators: state.operators,
    language: state.language,
    page: state.page,
    origin: state.origin
  };
};

let Departures = connect(mapStateToProps)(UnconnectedDepartures);
export default Departures;
