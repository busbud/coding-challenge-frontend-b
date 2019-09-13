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
    <div className="bus-list-card">
      <h1 className="bus-list-title">{props.title}</h1>
      <Button
        onClick={props.searchDepartures}
        className="bus-list-find-button"
        type="primary"
        size="big"
      >
        {props.submitText}
      </Button>
    </div>
  );
};

export default DeparturesForm;
