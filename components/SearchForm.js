import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = props => (
  <React.Fragment>
    <input
      className="datepicker"
      type="text"
      value={props.value}
      onClick={props.onClick}
    />
    <style jsx>{`
      input {
        border-radius: 8px;
        font-size: 16px;
        height: 48px;
        padding: 10px;
        width: 100%;
      }
    `}</style>
  </React.Fragment>
);

const SearchForm = props => (
  <form onSubmit={props.handleSubmit}>
    <div className="wrapper">
      <div className="group">
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
      </div>
      <div className="group">
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
      </div>
      <div className="group">
        <label htmlFor="outbound_date">Date</label>
        <div className="datepicker-wrapper">
          <DatePicker
            id="outbound_date"
            selected={props.outbound_date}
            onChange={props.handleDateChange}
            customInput={<CustomDatePicker />}
          />
        </div>
      </div>
      <div className="button-wrapper">
        <input className="button" type="submit" value="Search" />
      </div>
    </div>
    <style jsx>{`
      form {
        margin-left: auto;
        margin-right: auto;
        margin-top: 40px;
        max-width: 960px;
      }
      .wrapper {
        align-items: end;
        display: grid;
        grid-column-gap: 16px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
      }
      .group {
        flex: 1;
      }
      label {
        color: #fff;
        display: block;
        font-weight: bold;
        text-transform: uppercase;
      }
      select {
        display: block;
        font-size: 16px;
        height: 48px;
        margin-top: 8px;
        width: 100%;
      }
      .datepicker-wrapper {
        margin-top: 8px;
      }
      .button {
        background-color: #ff5c60;
        border: 1px solid #ff5c60;
        border-radius: 40px;
        color: white;
        cursor: pointer;
        font-family: "Changa One";
        font-size: 18px;
        padding: 14px 30px;
        text-transform: uppercase;
        width: 100%;
      }
      .button:hover {
        background-color: #cc463c;
        border-color: #cc463c;
      }
    `}</style>
  </form>
);

SearchForm.propTypes = {
  handleDateChange: PropTypes.func,
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  destination: PropTypes.string,
  origin: PropTypes.string,
  outbound_date: PropTypes.instanceOf(Date)
};

export default SearchForm;
