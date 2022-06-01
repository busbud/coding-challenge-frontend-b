import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import styled from "styled-components";

import ResultList from "./ResultList";
import SearchInput from "./SearchInput";
import { apiBase, apiVersion } from "../types";
import { toCamel } from "../utils";
import { TranslationType } from "../lang";

const SearchContainerWrapper = styled.div`
  position: relative;
  padding: 10px;

  .form {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  .field {
    border: 1px solid lightgray;
    padding: 0.25rem 0.5rem;
    flex: 1;
  }

  .label {
    display: block;
  }

  .value {
    white-space: nowrap;
  }
`;

interface SearchContainerProps {
  language: string;
  currency: string;
  t: TranslationType;
}

function SearchContainer(props: SearchContainerProps) {
  const { language, currency, t } = props;

  const initialValue = {
    origin: {
      display: "Quebec",
      value: "f2m673",
    },
    destination: {
      display: "Montreal",
      value: "f25dvk",
    },
    outboundDate: "2022-07-29",
    adult: 2,
  };
  const [formValue, setFormValue] = useState(initialValue);
  const [searchResult, setSearchResult] = useState<
    | undefined
    | {
        departures: [];
        locations: [];
      }
  >();
  const indexRef = useRef(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitSearchCondition();
    setFormValue(initialValue);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: "origin" | "destination"
  ) => {
    setFormValue({
      ...formValue,
      [field]: { display: event.target.value, value: formValue[field].value },
    });
  };

  const submitSearchCondition = async () => {
    setSearchResult(undefined);
    const qs = new URLSearchParams({
      adult: "1",
      child: "0",
      senior: "0",
      lang: language,
      currency: currency,
    });
    const data = await fetch(
      `${apiBase}${apiVersion}/search/${formValue.origin.value}/${formValue.destination.value}/${formValue.outboundDate}` +
        "?" +
        qs
    );
    const json = await data.json();

    if (json.complete === true) {
      setInitialSearchResult(json);
    } else {
      let isPollComplete = false;

      const interval = setInterval(async function () {
        const pollQs = qs;
        pollQs.append("index", indexRef.current.toString());

        if (!isPollComplete) {
          const data = await fetch(
            `${apiBase}${apiVersion}/search/${formValue.origin.value}/${formValue.destination.value}/${formValue.outboundDate}/poll` +
              "?" +
              pollQs
          );
          const json = await data.json();
          if (json.complete === true) {
            appendSearchResult(json);
            isPollComplete = true;
          }
        } else {
          clearInterval(interval);
          return;
        }
      }, 3000);
    }
  };

  const setInitialSearchResult = (json: any) => {
    const camelCaseDepartures = json.departures.map((d: object) => {
      const converted: Record<string, object> = {};
      Object.entries(d).forEach(([key, value]) => {
        converted[toCamel(key)] = value;
      });

      return converted;
    });

    setSearchResult({
      departures: camelCaseDepartures,
      locations: json?.locations,
    });
  };

  const appendSearchResult = (json: any) => {
    const camelCaseDepartures = json.departures.map((d: object) => {
      const converted: Record<string, object> = {};
      Object.entries(d).forEach(([key, value]) => {
        converted[toCamel(key)] = value;
      });

      return converted;
    });

    setSearchResult((prev) => {
      return {
        departures: prev?.departures
          ? prev.departures.concat(camelCaseDepartures)
          : camelCaseDepartures,
        locations: prev?.locations
          ? prev?.locations.concat(json?.locations)
          : json?.locations,
      };
    });
  };
  useEffect(() => {
    indexRef.current = searchResult?.departures.length || 0;
  }, [searchResult?.departures.length]);

  return (
    <SearchContainerWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <SearchInput
          className="field"
          field="origin"
          handleChange={handleChange}
          value={formValue["origin"].display}
          t={t}
        />
        <SearchInput
          className="field"
          field="destination"
          handleChange={handleChange}
          value={formValue["destination"].display}
          t={t}
        />
        <div className="field">
          <span className="label">{t.date}</span>
          <span className="value">2022-07-29</span>
        </div>
        <div className="field">
          <span className="label">{t.passenger}</span>
          <span className="value">1 {t.passengerUnit}</span>
        </div>
        <button type="submit">Submit</button>
      </form>
      {searchResult ? (
        <ResultList
          departures={searchResult?.departures}
          locations={searchResult?.locations}
          language={language}
          t={t}
        />
      ) : null}
    </SearchContainerWrapper>
  );
}

export default SearchContainer;
