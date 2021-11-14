import React from "react";
import { capitalize } from "lodash";
import Input from "../../../../components/Input";

export interface SearchInputGroupProps {
  names: string[];
  value: { [key: string]: number | undefined };
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function SearchInputGroup({
  names,
  value,
  onChange,
}: SearchInputGroupProps): JSX.Element {
  return (
    <>
      {names.map((name: string) => (
        <div key={`formData-${name}`} className="w-1/5 pl-2 flex items-center">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="text-gray-700">
            {capitalize(name)}
            <Input
              name={name}
              value={value[name] ?? 0}
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
