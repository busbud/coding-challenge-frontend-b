import React, { FC, useEffect, useState } from "react";
import { departureService } from "../services/departureService";

interface DestinationOption {
  name: string;
  geohash: string;
}

export const DepartureSearchForm: FC = () => {
  const today = new Date().toISOString().replace(/T.*/, "");
  const [values, setValues] = useState<DepartureSearchInitParams>({
    origin: PROMOTION_ORIGINS[0].geohash,
    destination: PROMOTION_DESTINATION.geohash,
    outboundDate: today,
  });

  const [lastIndex, setLastIndex] = useState<number>(0);

  const updateValues = (e: React.ChangeEvent<any>): void => {
    if (!e.target.name || !e.target.value) return;
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // TODO: remove
  useEffect(() => {
    console.log(values);
  }, [values]);

  const searchDepartures = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await departureService.searchInit(values).then((res) => {
      if (res) {
        setLastIndex(res.departures.length - 1);
      }
    });
    console.log(res);
  };

  return (
    <div>
      <form onSubmit={searchDepartures}>
        <select name="origin" value={values.origin} onChange={updateValues}>
          {PROMOTION_ORIGINS.map((g: DestinationOption, i: number) => (
            <option key={i} value={g.geohash}>
              {g.name}
            </option>
          ))}
        </select>
        {">>"}
        <select
          name="destination"
          value={values.origin}
          onChange={updateValues}
          disabled
        >
          <option value={PROMOTION_DESTINATION.geohash}>
            {PROMOTION_DESTINATION.name}
          </option>
        </select>
        <input
          type="date"
          name="outboundDate"
          min={today}
          value={values.outboundDate}
          onChange={updateValues}
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
};

const PROMOTION_ORIGINS = [
  { name: "Toronto", geohash: "dpz88g" },
  { name: "Quebec City", geohash: "f2m673" },
  { name: "Ottawa", geohash: "f244m6" },
];

const PROMOTION_DESTINATION = {
  name: "Montréal",
  geohash: "f25dvk",
};
