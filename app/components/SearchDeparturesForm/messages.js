/*
 * This contains all the text for the SearchDeparturesForm component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'busbud.components.SearchDeparturesForm';

export default defineMessages({
  origin: {
    id: `${scope}.origin`,
    defaultMessage: 'Origin',
  },
  destination: {
    id: `${scope}.destination`,
    defaultMessage: 'Destination',
  },
  outboundDate: {
    id: `${scope}.outboundDate`,
    defaultMessage: 'Date',
  },
  adult: {
    id: `${scope}.adult`,
    defaultMessage: 'Adults',
  },
  quebec: {
    id: `${scope}.quebec`,
    defaultMessage: 'Québec',
  },
  montreal: {
    id: `${scope}.montreal`,
    defaultMessage: 'Montréal',
  },
  chooseUpcomingDate: {
    id: `${scope}.chooseUpcomingDate`,
    defaultMessage: 'Date must be in the future',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Search',
  },
});
