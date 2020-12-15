import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider, defineMessages } from 'react-intl';

import ToggleOption from '../index';

describe('<ToggleOption />', () => {
  it('should render default language messages', () => {
    const defaultEnMessage = 'someContent';
    const message = defineMessages({
      enMessage: {
        id: 'busbud.containers.LocaleToggle.en',
        defaultMessage: defaultEnMessage,
      },
    });
    const { container } = render(
      <IntlProvider locale="en">
        <ToggleOption value="en" message={message.enMessage} />
      </IntlProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should display `value`(two letter language code) when `message` is absent', () => {
    const { queryByText } = render(
      <IntlProvider locale="fr">
        <ToggleOption value="fr" />
      </IntlProvider>,
    );
    expect(queryByText('fr')).toBeDefined();
  });
});
