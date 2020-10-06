import React from "react";
import { useTranslation } from "react-i18next";

import "./DestinationDropdownToggle.scss";
import { Dropdown } from "react-bootstrap";
import { IDestinationFull } from "../../containers/SearchSection/SearchSection";

interface IDestinationDropdownToggleProps {
  destinationFull: IDestinationFull;
}

const DestinationDropdownToggle: React.FC<IDestinationDropdownToggleProps> = ({
  destinationFull,
}) => {
  const { t } = useTranslation();

  return (
    <Dropdown.Toggle>
      {destinationFull.selectedDestination
        ? destinationFull.selectedDestination.value
        : t("SELECT_CITY")}
    </Dropdown.Toggle>
  );
};

export default DestinationDropdownToggle;
