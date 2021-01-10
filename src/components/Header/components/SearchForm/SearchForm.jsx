import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Select from "commons/Select";
import DatePicker from "commons/DatePicker";
import Button from "commons/Button";

import { Form, FormControl } from "./styles";

const SearchForm = ({ onSearch, ...otherProps }) => {
  const { t } = useTranslation();
  const [originCity, setOriginCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [passengers, setPassengers] = React.useState("");
  const [outboundDate, setOutboundDate] = React.useState(null);

  const handleOriginCityChange = (value) => {
    setOriginCity(value);
  };

  const handleDestinationCityChange = (value) => {
    setDestinationCity(value);
  };

  const handlePassengersChange = (value) => {
    setPassengers(value);
  };

  const handleDateChange = (date, dateString) => {
    setOutboundDate(dateString);
  };

  const handleSearch = () => {
    onSearch({
      originCity,
      destinationCity,
      outboundDate,
      passengers,
    });
  };

  return (
    <Form {...otherProps}>
      <FormControl>
        <Select
          style={{ width: "100%" }}
          defaultValue={originCity}
          onChange={handleOriginCityChange}
          data-testid="origin-city-select"
        >
          <Select.Option value="">
            <em>{t("originCity")}</em>
          </Select.Option>
          <Select.Option value="f2m673">Québec</Select.Option>
        </Select>
      </FormControl>
      <FormControl>
        <Select
          style={{ width: "100%" }}
          defaultValue={destinationCity}
          onChange={handleDestinationCityChange}
          data-testid="destination-city-select"
        >
          <Select.Option value="">
            <em>{t("destinationCity")}</em>
          </Select.Option>
          <Select.Option value="f25dvk">Montréal</Select.Option>
        </Select>
      </FormControl>
      <FormControl>
        <Select
          style={{ width: "100%" }}
          defaultValue={passengers}
          onChange={handlePassengersChange}
          data-testid="passengers-select"
        >
          <Select.Option value="">
            <em>{t("passengers")}</em>
          </Select.Option>
          <Select.Option value="1">1 {t("adult")}</Select.Option>
        </Select>
      </FormControl>
      <FormControl>
        <DatePicker
          style={{ width: "100%" }}
          onChange={handleDateChange}
          data-testid="outbound-date-picker"
          placeholder="Outbound Date"
        />
      </FormControl>
      <FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          data-testid="search-button"
        >
          {t("search")}
        </Button>
      </FormControl>
    </Form>
  );
};

SearchForm.propTypes = {
  /**
   * The search event trigger.
   */
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;
