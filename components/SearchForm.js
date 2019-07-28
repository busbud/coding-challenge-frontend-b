import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class CustomDatePicker extends React.Component {
  render() {
    return (
      <React.Fragment>
        <input
          className="datepicker"
          type="text"
          value={this.props.value}
          onClick={this.props.onClick}
          readOnly
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
  }
}

CustomDatePicker.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func
};

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
            dateFormat="dd/MM/yyyy"
            highlightDates={[
              new Date("August 2, 2019"),
              new Date("August 3, 2019"),
              new Date("August 4, 2019")
            ]}
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
        grid-column-gap: 8px;
        grid-template-columns: 1fr 1fr 1fr 160px;
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
        appearance: none;
        display: block;
        font-size: 16px;
        height: 48px;
        margin-top: 8px;
        padding: 10px;
        width: 100%;
      }
      .datepicker-wrapper {
        margin-top: 8px;
      }
      :global(.react-datepicker-wrapper,.react-datepicker__input-container {
        width: 100%;
      })
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
