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
import Spinner from "../../../../components/Spinner";
import Alert from "../../../../components/Alert";

const ITEM_PER_PAGE = 10;

function TicketsPage(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const searchData = useAppSelector(searchSelector);
  const {
    tickets: ticketsData,
    complete: completeData,
    loading,
    error,
  } = useAppSelector(({ tickets }) => tickets);
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
    setCurrentPage(1);
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
        <UpdateButton loading={loading} onClick={reloadData} />
      </div>
      {!completeData && loading && <Spinner />}
      <div className="flex flex-col items-center mt-10">
        {!error &&
          completeData &&
          (ticketsData.length > 0 ? (
            <>
              <ListTicket
                tickets={ticketsData.slice(
                  (currentPage - 1) * ITEM_PER_PAGE,
                  currentPage * ITEM_PER_PAGE
                )}
              />
              <div className="flex justify-center items-end pt-5">
                <Pagination
                  count={ticketsData.length}
                  itemsPerPage={ITEM_PER_PAGE}
                  onChange={paginationOnChange}
                  currentPage={currentPage}
                />
              </div>
            </>
          ) : (
            <Alert variant="warning">No tickets found :(</Alert>
          ))}
        {error && (
          <Alert variant="danger">
            An error has occurred, please contact support!
          </Alert>
        )}
      </div>
    </div>
  );
}

export default TicketsPage;
