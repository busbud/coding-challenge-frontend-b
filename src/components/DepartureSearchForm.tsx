import React, { FC, useState } from "react";
import { departureService } from "../services/departureService";
import { squashSearchResults } from "../utils/squashSearchResults";
import svgPerson from "../assets/person.svg";

interface DestinationOption {
  name: string;
  geohash: string;
}

interface Props {
  setLoading: (state: boolean) => void;
  setSearchResult: (result: DepartureSearchResponse | null) => void;
}

export const DepartureSearchForm: FC<Props> = ({
  setLoading,
  setSearchResult,
}) => {
  const today = new Date().toISOString().replace(/T.*/, "");

  const initialFormValues = {
    origin: PROMOTION_ORIGINS[0].geohash,
    destination: PROMOTION_DESTINATION.geohash,
    outboundDate: today,
    adults: 1,
  };

  const [formValues, setFormValues] = useState<DepartureSearchInitParams>(
    initialFormValues
  );

  const updateFormValues = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    if (!e.target.name || !e.target.value) return;
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const searchDepartures = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    setSearchResult(null);
    setLoading(true);
    const responses = await departureService
      .search(formValues)
      .catch((e) => alert(e));
    if (responses) {
      const finalResult = squashSearchResults(responses);
      setSearchResult(finalResult);
    }
    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={searchDepartures}
        className="w-full bg-bb-blue py-6 px-12 md:rounded-full shadow-lg"
      >
        <div className="flex md:justify-center md:items-center flex-col md:flex-row ">
          <div className="flex flex-wrap sm:justify-center items-center">
            {/* Origin */}
            <select
              name="origin"
              value={formValues.origin}
              className="w-full sm:w-auto px-2 py-2 ml-0 h-10 bg-white mb-2"
              onChange={updateFormValues}
            >
              {PROMOTION_ORIGINS.map((g: DestinationOption, i: number) => (
                <option key={i} value={g.geohash}>
                  {g.name}
                </option>
              ))}
            </select>
            <span className="text-white mx-2">{"to"}</span>
            {/* Destination */}
            <select
              name="destination"
              value={formValues.origin}
              onChange={updateFormValues}
              className="w-full sm:w-auto px-2 py-2 mx-0 h-10 bg-white mb-2"
              disabled
            >
              <option value={PROMOTION_DESTINATION.geohash}>
                {PROMOTION_DESTINATION.name}
              </option>
            </select>
          </div>
          <div className="flex flex-wrap sm:justify-center sm:flex-row">
            {/* Outbound Date */}
            <input
              type="date"
              name="outboundDate"
              min={today}
              max="2020-12-31"
              value={formValues.outboundDate}
              className="w-full sm:w-auto px-2 py-2 mb-2 h-10"
              onChange={updateFormValues}
            />
            <div className="h-10 bg-white flex items-center">
              {/* Adult count*/}
              <img src={svgPerson} alt="Person icon" className="h-6" />
              <input
                type="number"
                name="adults"
                min="1"
                max="10"
                value={formValues.adults}
                className="w-12 px-2"
                onChange={updateFormValues}
              />
            </div>
            <input
              type="submit"
              className="cursor-pointer px-6 py-2 mb-2 h-10 bg-bb-orange text-white "
              value="Search"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const PROMOTION_ORIGINS = [
  { name: "Quebec City", geohash: "f2m673" },
  { name: "Ottawa", geohash: "f244m6" },
  { name: "Sherbrooke", geohash: "f2hf7b" },
];

const PROMOTION_DESTINATION = {
  name: "Montréal",
  geohash: "f25dvk",
};
