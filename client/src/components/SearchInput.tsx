import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { capitalize } from "../utils";
import { TranslationType } from "../lang";

interface SearchInputProps {
  field: "origin" | "destination";
  handleChange: (
    e: ChangeEvent<HTMLInputElement>,
    field: "origin" | "destination"
  ) => void;
  value: string;
  className: string;
  t: TranslationType;
}
const SearchInputWrapper = styled.div`
  display: block;
  position: relative;

  .label {
    display: block;
  }
`;

function SearchInput(props: SearchInputProps) {
  const { field, handleChange, value, className, t } = props;
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, field);
  };

  return (
    <SearchInputWrapper className={className}>
      <label className="label">{capitalize(t[field])}</label>
      <input name="message" type="text" onChange={onChange} value={value} />
    </SearchInputWrapper>
  );
}

export default SearchInput;
