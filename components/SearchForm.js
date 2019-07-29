import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

import { withTranslation } from "../lib/i18n";
import { fonts } from "../lib/theme";
import Button from "./Button";
import CustomDatePicker from "./CustomDatePicker";

import "react-datepicker/dist/react-datepicker.css";

const SearchForm = props => (
  <form onSubmit={props.handleSubmit}>
    <div className="grid">
      <div className="group">
        <label htmlFor="origin">{props.t("leaving-from")}</label>
        <select
          id="origin"
          name="origin"
          value={props.origin}
          onChange={props.handleInputChange}
        >
          <option value="dr5reg">{props.t("new-york")}</option>
          <option value="f25dvk">{props.t("montreal")}</option>
        </select>
      </div>
      <div className="group">
        <label htmlFor="destination">{props.t("going-to")}</label>
        <select
          id="destination"
          name="destination"
          value={props.destination}
          onChange={props.handleInputChange}
        >
          <option value="f25dvk">{props.t("montreal")}</option>
          <option value="dr5reg">{props.t("new-york")}</option>
        </select>
      </div>
      <div className="group">
        <label htmlFor="outbound_date">{props.t("date")}</label>
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
        <Button block>{props.t("search")}</Button>
      </div>
    </div>
    <style jsx>{`
      form {
        margin-left: auto;
        margin-right: auto;
        margin-top: 32px;
        max-width: 960px;
      }
      .grid {
        align-items: end;
        display: grid;
        grid-column-gap: 8px;
        grid-row-gap: 16px;
        grid-template-columns: 1fr;
      }
      @media (min-width: 480px) {
        .grid {
          grid-template-columns: 1fr 1fr;
        }
      }
      @media (min-width: 640px) {
        .grid {
          grid-template-columns: 1fr 1fr 1fr 180px;
        }
      }
      .group {
        flex: 1;
      }
      label {
        color: white;
        display: block;
        font-family: ${fonts.slab};
      }
      select {
        appearance: none;
        border-radius: 8px;
        display: block;
        font-size: 1rem;
        height: 48px;
        margin-top: 8px;
        padding: 10px;
        width: 100%;
      }
      .datepicker-wrapper {
        margin-top: 8px;
      }
      :global(.react-datepicker-wrapper, .react-datepicker__input-container) {
        width: 100%;
      }
      .button-wrapper {
        margin-top: 12px;
      }
    `}</style>
  </form>
);

SearchForm.propTypes = {
  handleDateChange: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  destination: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
  outbound_date: PropTypes.instanceOf(Date).isRequired,
  t: PropTypes.func.isRequired
};

export default withTranslation("common")(SearchForm);
