import React from 'react';
import ReactDOM from 'react-dom';

import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';


/** Panel that displays filters. */
export default class FilteringPanel extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const isChecked = target.type === 'checkbox' ? target.checked : target.value;
    const operatorId = target.name;
    this.props.filterByOperator(operatorId, isChecked);
  }

  /**
   * Render departure item
   */
  render() {
    const checkboxes = this.props.operators.map((operator) => {
      return (
        <label key={operator.id} data-id="{operator.id}">
          <input
            name={operator.id}
            type="checkbox"
            onChange={this.handleChange}
          />
          {operator.name}
        </label>
      )
    });
    return (
      <div className="filtering-panel panel">
        {checkboxes}
      </div>
    );
  }

}