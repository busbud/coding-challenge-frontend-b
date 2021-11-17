import React from "react";
import { capitalize } from "lodash";
import Input from "../../../../components/Input";
import { RootState } from "../../../../redux/store";

export interface SearchInputGroupProps {
  value: RootState["search"];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function SearchInputGroup({
  value,
  onChange,
}: SearchInputGroupProps): JSX.Element {
  const names: ["adult"] = ["adult"];

  return (
    <>
      {names.map((name) => (
        <div key={`formData-${name}`} className="w-1/5 pl-2 flex  items-center">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="text-gray-700">
            {capitalize(name)}
            <Input
              name={name}
              value={value[name]}
              type="number"
              onChange={onChange}
              placeholder="Adults"
            />
          </label>
        </div>
      ))}
    </>
  );
}

export default SearchInputGroup;
