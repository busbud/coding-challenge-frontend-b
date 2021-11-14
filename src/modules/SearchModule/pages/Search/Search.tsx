import React, { useMemo, useState } from "react";
import Button from "../../../../components/Button";
import SearchInputGroup from "../../components/SearchInputGroup";

interface FormDataType {
  adult?: number;
  child?: number;
  senior?: number;
  [key: string]: number | undefined;
}

function Search(): JSX.Element {
  const [formData, setFormData] = useState<FormDataType>({});

  const buttonDisabled = useMemo(
    () => Object.keys(formData).filter((key) => formData[key]).length === 0,
    [formData]
  );

  const onFormDataChange = ({
    currentTarget: { name, value },
  }: React.FormEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: +value >= 0 ? +value : 0,
    }));
  };

  return (
    <div className="w-full flex">
      <SearchInputGroup
        names={["adult", "child", "senior"]}
        value={formData}
        onChange={onFormDataChange}
      />
      <div className="w-1/5 pl-5 flex items-end">
        <Button disabled={buttonDisabled}>Submit</Button>
      </div>
    </div>
  );
}

export default Search;
