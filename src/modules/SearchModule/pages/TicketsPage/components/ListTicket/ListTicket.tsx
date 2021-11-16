import React from "react";
import ListTicketItem from "./ListTicketItem";
import { TicketsDTOOutput } from "../../../../../../lib/types/busbud";

interface ListTicketProps {
  tickets: TicketsDTOOutput["departures"];
}

function ListTicket({ tickets }: ListTicketProps): JSX.Element {
  return (
    <div className="flex flex-col mt-10">
      <ul className="flex flex-col items-center overflow-y-auto">
        {tickets.map((ticket) => (
          <ListTicketItem key={`ListTicketItem-${ticket.id}`} ticket={ticket} />
        ))}
      </ul>
    </div>
  );
}

export default ListTicket;
