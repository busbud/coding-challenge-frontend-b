import React from 'react';

import PropTypes from 'prop-types';

import { Operator } from '../types';

/** Panel that displays filters. */
export default class FilteringPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Handle operator filter
   */
  handleChange(event) {
    const { target } = event;
    const isChecked = target.type === 'checkbox' ? target.checked : target.value;
    const operatorId = target.name;
    const { filterByOperator } = this.props;
    filterByOperator(operatorId, isChecked);
  }

  /**
   * Render filtering panel
   */
  render() {
    const { operators } = this.props;
    // Security filtering : it appears that sometime operators are listed more than once
    const uniqueOperators = operators.filter((op, index, self) => (
      index === self.findIndex(o => op.id === o.id)));
    const checkboxes = uniqueOperators.map(operator => (
      <label key={operator.id} htmlFor={operator.id}>
        <input
          id={operator.id}
          name={operator.id}
          type="checkbox"
          onChange={this.handleChange}
        />
        {operator.name}
      </label>
    ));
    return (
      <div className="filtering-panel panel">
        {checkboxes}
      </div>
    );
  }
}

FilteringPanel.propTypes = {
  filterByOperator: PropTypes.func.isRequired,
  operators: PropTypes.arrayOf(Operator).isRequired,
};
