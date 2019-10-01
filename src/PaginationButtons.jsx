import React, { Component } from "react";
import { connect } from "react-redux";
import { t } from "./Translations.jsx";

class UnconnectedPaginationButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }

  goBackToPreviousPage = event => {
    event.preventDefault();
    this.setState({ page: this.state.page - 1 });
    this.props.dispatch({
      type: "go-back-to-previous-page",
      page: this.state.page
    });
  };

  goToNextPage = event => {
    event.preventDefault();
    this.setState({ page: this.state.page + 1 });
    this.props.dispatch({
      type: "go-to-next-page",
      page: this.state.page
    });
  };

  render = () => {
    let lng = this.props.language;
    return (
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

let PaginationButtons = connect(mapStateToProps)(UnconnectedPaginationButtons);

export default PaginationButtons;
