import React from 'react';

import PropTypes from 'prop-types';


/** Panel that displays ordering filters. */
export default class OrderingPanel extends React.Component {
  constructor(props) {
    super(props);

    this.onBadgeClick = this.onBadgeClick.bind(this);
  }

  /**
   * Handle order button onClick
   */
  onBadgeClick(event) {
    const orderType = event.currentTarget.dataset.id;
    const { orderBy } = this.props;
    orderBy(orderType);
  }

  /**
   * Render ordering panel
   */
  render() {
    const { strings, nbResults } = this.props;
    const displayResults = `${nbResults} ${strings.results}`;
    return (
      <div className="ordering-panel container">
        <div className="panel">
          <div className="row">
            <div className="col-md-9">
              <span className="badge" onClick={this.onBadgeClick} onKeyPress={this.onBadgeClick} data-id="earliest" role="radio" tabIndex="0" aria-checked="false">{strings.earliest}</span>
              <span className="badge" onClick={this.onBadgeClick} onKeyPress={this.onBadgeClick} data-id="latest" role="radio" tabIndex="-1" aria-checked="false">{strings.latest}</span>
              <span className="badge" onClick={this.onBadgeClick} onKeyPress={this.onBadgeClick} data-id="cheapest" role="radio" tabIndex="-2" aria-checked="false">{strings.cheapest}</span>
              <span className="badge" onClick={this.onBadgeClick} onKeyPress={this.onBadgeClick} data-id="fastest" role="radio" tabIndex="-3" aria-checked="false">{strings.fastest}</span>
            </div>
            <div className="col-md-3 text-right results">{displayResults}</div>
          </div>
        </div>
      </div>
    );
  }
}

OrderingPanel.propTypes = {
  orderBy: PropTypes.func.isRequired,
  nbResults: PropTypes.number.isRequired,
  strings: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
