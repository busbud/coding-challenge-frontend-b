/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'busbud.containers.HomePage';

export default defineMessages({
  searchDeparturesHeader: {
    id: `${scope}.searchDeparturesHeader`,
    defaultMessage:
      'Search all departures for a given origin city and a given destination city for a given day',
  },
});
