import React from "react";
import ListTicketItem from "./ListTicketItem";
import { TicketsDTOOutput } from "../../../../../../lib/types/busbud";

interface ListTicketProps {
  tickets: TicketsDTOOutput["departures"];
}

function ListTicket({ tickets }: ListTicketProps): JSX.Element {
  return (
    <div className="flex flex-col w-full flex-grow">
      <ul className="flex flex-col items-center flex-grow pt-5">
        {tickets.map((ticket) => (
          <ListTicketItem
            key={`ListTicketItem-${ticket.id}-${ticket.departure_time}-${ticket.arrival_time}`}
            ticket={ticket}
          />
        ))}
      </ul>
    </div>
  );
}

export default ListTicket;
