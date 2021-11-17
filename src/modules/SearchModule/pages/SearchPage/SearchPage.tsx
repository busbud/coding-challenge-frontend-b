import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import SearchInputGroup from "../../components/SearchInputGroup";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  searchSelector,
  updateSearchData,
} from "../../../../redux/features/search";

function SearchPage(): JSX.Element {
  const searchData = useAppSelector(searchSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const buttonDisabled = useMemo(
    () => !searchData.adult && !searchData.child && !searchData.senior,
    [searchData]
  );

  const onFormDataChange = ({
    currentTarget: { name, value },
  }: React.FormEvent<HTMLInputElement>) => {
    dispatch(updateSearchData({ name, value: +value }));
  };

  const onSubmit = () => {
    navigate("/search/tickets");
  };

  return (
    <div className="w-full flex items-end justify-center">
      <SearchInputGroup value={searchData} onChange={onFormDataChange} />
      <div className="w-1/5 pl-5 flex items-end">
        <Button onClick={onSubmit} disabled={buttonDisabled}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default SearchPage;
