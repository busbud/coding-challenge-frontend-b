import React from 'react';
import ReactDOM from "react-dom";


/** Panel that displays ordering filters. */
export default class OrderingPanel extends React.Component {

  constructor(props) {
    super(props);

    this.onBadgeClick = this.onBadgeClick.bind(this);
  }

  onBadgeClick(event) {
    const orderType = event.currentTarget.dataset.id;
    this.props.orderBy(orderType);
  }

  /**
   * Render departure item
   */
  render() {
    return (
      <div className="ordering-panel container">
        <div className="panel">
          <div className="row">
            <div className="col-md-9">
              <span className="badge" onClick={this.onBadgeClick} data-id="earliest">{this.props.strings.earliest}</span>
              <span className="badge" onClick={this.onBadgeClick} data-id="latest">{this.props.strings.latest}</span>
              <span className="badge" onClick={this.onBadgeClick} data-id="cheapest">{this.props.strings.cheapest}</span>
              <span className="badge" onClick={this.onBadgeClick} data-id="fastest">{this.props.strings.fastest}</span>
            </div>
            <div className="col-md-3 text-right">{this.props.nbResults} {this.props.strings.results}</div>
          </div>
        </div>
      </div>
    );
  }

}