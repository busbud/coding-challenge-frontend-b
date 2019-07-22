import React from "react";

export default class LanguageSelect extends React.Component {
  state = {
    currentValue: this.props.getCurrentValue()
  };

  onChange = event => {
    const { value } = event.target;
    this.props.changeValue(value);
    window.location.reload();
    this.setState({ currentValue: value });
  };

  render() {
    const { currentValue } = this.state;
    const { listOfValues } = this.props;
    return (
      <select className="select" onChange={this.onChange} value={currentValue}>
        {_.map(listOfValues, value => {
          return (
            <option value={value} key={value}>
              {value.toUpperCase()}
            </option>
          );
        })}
      </select>
    );
  }
}
