import React from "react";
import "./pagination.scss";

interface PaginationProps {
  count: number;
  currentPage: number;
  itemsPerPage: number;
  onChange: (page: number) => void;
}

function Pagination({
  count,
  currentPage,
  itemsPerPage,
  onChange,
}: PaginationProps): JSX.Element {
  const countPages = Math.ceil(count / itemsPerPage);
  return (
    <div className="Pagination">
      <button
        type="button"
        disabled={currentPage === 1}
        className="prev"
        onClick={() => onChange(currentPage - 1)}
      >
        Previous
      </button>
      {[...Array(countPages).keys()].map((id) => (
        <button
          key={`pagination-item-${id}`}
          type="button"
          className={`select-page${
            currentPage === id + 1 ? " current-page" : ""
          }`}
          onClick={() => onChange(id + 1)}
        >
          {id + 1}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage === countPages}
        className="next"
        onClick={() => onChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
