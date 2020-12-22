import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { isEmpty } from "lodash";
import Loader from "react-loader-spinner";
import { fetchDepartures } from "../store/action.creators";
import { DatePicker } from "./DatePicker";
import {
  Wrapper,
  StyledTextbox,
  Button,
  Banner,
  DatePickerWrapper,
  Language,
  EmptyContent,
  LoaderWrapper
} from "./Styled";
import { DepartureInfos } from "./DepartureInfos";

export const BoardingPage = () => {
  const [date, setDate] = useState(moment());
  const [lang, setLanguage] = useState("en");
  const [adult, setAdult] = useState(1);

  const dispatch = useDispatch();
  const handleDatechanged = e => {
    setDate(e);
  };

  const handleSubmit = () => {
    dispatch(fetchDepartures({ date: date.format("YYYY-MM-DD"), adult, lang }));
  };
  const allDepartures = useSelector(state => state.departures.departures);
  const busy = useSelector(state => state.busy);
  const handleLanguage = language => {
    setLanguage(language);
  };

  return (
    <>
      <Banner>
        <Language>
          <p onClick={() => handleLanguage("fr")}>Francais</p>
          <p onClick={() => handleLanguage("en")}>English</p>
        </Language>
        <h3>Plan your trip to OSHEAGA</h3>
        <Wrapper>
          <StyledTextbox>
            <label>From</label>
            <input
              type="text"
              placeholder={"Enter origin city"}
              value={"Quebec city"}
            />
          </StyledTextbox>
          <StyledTextbox>
            <label>To</label>
            <input
              type="text"
              placeholder={"Enter destination city"}
              value={"Montreal"}
            />
          </StyledTextbox>
          <DatePickerWrapper>
            <label>Leaving</label>
            <DatePicker
              block
              date={date}
              id="date_input"
              transitionDuration={0}
              onDateChange={e => handleDatechanged(e)}
              placeholder={"Pick a date"}
            />
          </DatePickerWrapper>
          <StyledTextbox>
            <label>How many travelers?</label>
            <input
              type="number"
              min="1"
              placeholder={"Number of passengers"}
              value={adult}
              onChange={e => setAdult(e.target.value)}
            />
          </StyledTextbox>
        </Wrapper>
        <Button
          type="submit"
          onClick={() => {
            handleSubmit();
          }}
        >
          {"Find tickets"}
        </Button>
      </Banner>
      {busy && (
        <LoaderWrapper>
          {" "}
          <Loader
            type="Grid"
            color="#4f7a5af5"
            height={90}
            width={90}
            visible
          />{" "}
        </LoaderWrapper>
      )}
      {!isEmpty(allDepartures) &&
        allDepartures.map(departure => (
          <DepartureInfos key={departure.ttl} departure={departure} />
        ))}
    </>
  );
};

// :<EmptyContent>{'No ticket to display!'}</EmptyContent>
