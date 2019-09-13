import React from "react";
import Button from "./ui/Button";
import "./DeparturesForm.css";

interface DeparturesFormProps {
  searchDepartures: () => void;
  title: string;
  submitText: string;
}

const DeparturesForm: React.FunctionComponent<DeparturesFormProps> = props => {
  return (
    <div className="bus-form-card">
      <h1 className="bus-form-title">{props.title}</h1>
      <div className="bus-form">
        <div>
          <input
            className="bus-form__input"
            value="New York"
            disabled={true}
          ></input>
          <input
            className="bus-form__input"
            value="Montreal"
            disabled={true}
          ></input>
        </div>
        <input
          className="bus-form__input bus-form__input--long"
          value="August 2nd, 2020"
          disabled={true}
        ></input>
      </div>
      <Button
        onClick={props.searchDepartures}
        className="bus-form__submit"
        type="primary"
        size="big"
      >
        {props.submitText}
      </Button>
    </div>
  );
};

export default DeparturesForm;
