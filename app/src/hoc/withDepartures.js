import React from "react";

import { DeparturesContext } from "./../store/DeparturesProvider/DeparturesProvider";

export const withDepartures = Component => props => (
  <DeparturesContext.Consumer>
    {context => <Component {...props} {...context} />}
  </DeparturesContext.Consumer>
);
