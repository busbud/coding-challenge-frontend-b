import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const SearchForm = props => (
  <form onSubmit={props.handleSubmit}>
    <label htmlFor="origin">Leaving from</label>
    <select
      id="origin"
      name="origin"
      value={props.origin}
      onChange={props.handleInputChange}
    >
      <option value="dr5reg">New York</option>
      <option value="f25dvk">Montreal</option>
    </select>
    <label htmlFor="destination">Going to</label>
    <select
      id="destination"
      name="destination"
      value={props.destination}
      onChange={props.handleInputChange}
    >
      <option value="f25dvk">Montreal</option>
      <option value="dr5reg">New York</option>
    </select>
    <label htmlFor="outbound_date">Date</label>
    <DatePicker
      selected={props.outbound_date}
      onChange={props.handleDateChange}
    />
    <input type="submit" value="Search" />
  </form>
);

SearchForm.propTypes = {
  handleDateChange: PropTypes.func,
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  destination: PropTypes.string,
  origin: PropTypes.string,
  outbound_date: PropTypes.date
};

export default SearchForm;
