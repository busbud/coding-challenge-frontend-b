import React, { Component } from "react";
import counterpart from "counterpart";

class LocaleSwitcher extends Component {
  handleChange(e) {
    counterpart.setLocale(e.target.value);
  }

  render() {
    return (
      <p>
        <span>Switch Locale:</span>

        <select
          defaultValue={counterpart.getLocale()}
          onChange={this.handleChange}
        >
          <option>en</option>
          <option>de</option>
        </select>
      </p>
    );
  }
}

export default LocaleSwitcher;
