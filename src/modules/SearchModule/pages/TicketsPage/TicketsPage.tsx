import React, { useEffect, useState } from "react";
import SearchInputGroup from "../../components/SearchInputGroup";
import {
  searchSelector,
  updateSearchData,
} from "../../../../redux/features/search";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  cleanTicketsReducer,
  fetchTickets,
} from "../../../../redux/features/tickets";
import ListTicket from "./components/ListTicket/ListTicket";
import UpdateButton from "../../../../components/UpdateButton";
import Pagination from "../../../../components/Pagination/Pagination";

function TicketsPage(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const searchData = useAppSelector(searchSelector);
  const { tickets: ticketsData, complete: completeData } = useAppSelector(
    ({ tickets: { tickets, complete } }) => ({
      tickets,
      complete,
    })
  );
  const dispatch = useAppDispatch();

  const onFormDataChange = ({
    currentTarget: { name, value },
  }: React.FormEvent<HTMLInputElement>) => {
    dispatch(updateSearchData({ name, value: +value }));
  };

  const paginationOnChange = (page: number) => {
    setCurrentPage(page);
  };

  const reloadData = () => {
    dispatch(fetchTickets());
  };

  useEffect(() => {
    dispatch(fetchTickets());
    return () => {
      dispatch(cleanTicketsReducer());
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col w-full justify-center">
      <div className="flex justify-center items-end">
        <SearchInputGroup value={searchData} onChange={onFormDataChange} />
        <UpdateButton onClick={reloadData} />
      </div>
      {completeData && (
        <>
          <ListTicket
            tickets={ticketsData.slice((currentPage - 1) * 3, currentPage * 3)}
          />
          <div className="flex justify-center items-end pt-5">
            <Pagination
              count={ticketsData.length}
              itemsPerPage={3}
              onChange={paginationOnChange}
              currentPage={currentPage}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default TicketsPage;
