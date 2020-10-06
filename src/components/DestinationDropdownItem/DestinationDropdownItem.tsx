import React from "react";

import { Destination } from "../../models/Destination";

import "./DestinationDropdownItem.scss";
import { Dropdown } from "react-bootstrap";

interface IDestinationDropdownItemProps {
  destination: Destination;
  changeDestination: ChangeDestination;
}

type ChangeDestination = (destination: Destination) => void;

const DestinationDropdownItem: React.FC<IDestinationDropdownItemProps> = ({ destination, changeDestination}) => {
  return (
    <Dropdown.Item
      onClick={() => {
        changeDestination(destination);
      }}
    >
      {destination.value}
    </Dropdown.Item>
  );
};

export default DestinationDropdownItem;
