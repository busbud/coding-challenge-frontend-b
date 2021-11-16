import React from "react";
import moment from "moment";
import { TicketsDTOOutput } from "../../../../../../lib/types/busbud";
import { useAppSelector } from "../../../../../../hooks/redux";

interface ListTicketItemProps {
  ticket: TicketsDTOOutput["departures"][0];
}

function ListTicketItem({ ticket }: ListTicketItemProps): JSX.Element {
  const { locations, cities } = useAppSelector((state) => state.tickets);

  const findLocation = (locationId: number) =>
    locations.find((location) => location.id === locationId);

  const findCity = (cityId: string | undefined) =>
    cities.find((city) => city.id === cityId);

  const originLocation = findLocation(ticket.origin_location_id);
  const destinationLocation = findLocation(ticket.destination_location_id);

  const originCityName = findCity(originLocation?.city_id)?.name;
  const destinationCityName = findCity(destinationLocation?.city_id)?.name;

  const departureTimeFormatted = moment(ticket.departure_time).format(
    "hh:mm A"
  );
  const arrivalTimeFormatted = moment(ticket.arrival_time).format("hh:mm A");

  return (
    <li className="border-gray-400 flex flex-row mb-2 md:w-6/12">
      <div className="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 justify-between items-center p-4">
        <div className="pl-1">
          <div className="font-medium text-sm dark:text-white">
            {originLocation?.name}
          </div>
          <div className="text-gray-600 dark:text-gray-200 text-sm">
            {originCityName}
          </div>
        </div>
        <div className="pl-1">
          <div className="font-medium text-sm dark:text-white">
            {destinationLocation?.name}
          </div>
          <div className="text-gray-600 dark:text-gray-200 text-sm">
            {destinationCityName}
          </div>
        </div>
        <div className="text-gray-600 dark:text-gray-200 text-xs">
          {departureTimeFormatted}
        </div>
        <div className="text-gray-600 dark:text-gray-200 text-xs">
          {arrivalTimeFormatted}
        </div>
        <div className="text-gray-600 dark:text-gray-200 text-xs flex">
          {ticket.prices.currency} {ticket.prices.total / 100}
        </div>
      </div>
    </li>
  );
}

export default ListTicketItem;
