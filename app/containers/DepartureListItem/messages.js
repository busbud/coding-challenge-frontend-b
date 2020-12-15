/*
 * This contains all the text for the DepartureListItem component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'busbud.components.DepartureListItem';

export default defineMessages({
  quebec: {
    id: `${scope}.quebec`,
    defaultMessage: 'Québec',
  },
  montreal: {
    id: `${scope}.montreal`,
    defaultMessage: 'Montréal',
  },
});
