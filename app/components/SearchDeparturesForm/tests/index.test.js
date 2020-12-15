import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { browserHistory } from 'react-router-dom';

import SearchDeparturesForm from '../index';
import configureStore from '../../../configureStore';
import messages from '../messages';
import { MONTREAL, QUEBEC } from '../../../containers/App/constants';

describe('<SearchDeparturesForm />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render the SearchDeparturesForm form', () => {
    const searchParams = {
      origin: 'quebec',
      destination: 'montreal',
      outboundDate: '2020-12-13',
      adult: 1,
    };
    const submitSpy = jest.fn();

    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <SearchDeparturesForm
            onSubmitForm={submitSpy}
            searchParams={searchParams}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should submit the form if clicked on search', () => {
    const searchParams = {
      origin: 'quebec',
      destination: 'montreal',
      outboundDate: '2020-12-13',
      adult: 1,
    };
    const submitSpy = jest.fn();

    const { container, getByLabelText } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <SearchDeparturesForm
            onSubmitForm={submitSpy}
            searchParams={searchParams}
          />
        </IntlProvider>
      </Provider>,
    );

    const origin = messages.origin.defaultMessage;
    const destination = messages.destination.defaultMessage;
    const outboundDate = messages.outboundDate.defaultMessage;
    const adult = messages.adult.defaultMessage;
    fireEvent.change(getByLabelText(origin), { target: { value: QUEBEC } });
    fireEvent.change(getByLabelText(destination), {
      target: { value: MONTREAL },
    });

    const tomorrow = new Date(Date.now() + 1 * 24 * 3600 * 1000);
    fireEvent.change(getByLabelText(outboundDate), {
      target: { value: new Date(tomorrow).toISOString().split('T')[0] },
    });
    fireEvent.change(getByLabelText(adult), { target: { value: 2 } });
    fireEvent.click(container.querySelector('button[type="submit"]'));

    expect(submitSpy).toHaveBeenCalledTimes(1);
  });

  it('should not submit the form if date is in the past', () => {
    const searchParams = {
      origin: 'quebec',
      destination: 'montreal',
      outboundDate: '2020-11-13',
      adult: 1,
    };
    const submitSpy = jest.fn();

    const { container, getByLabelText } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <SearchDeparturesForm
            onSubmitForm={submitSpy}
            searchParams={searchParams}
          />
        </IntlProvider>
      </Provider>,
    );

    const origin = messages.origin.defaultMessage;
    const destination = messages.destination.defaultMessage;
    const outboundDate = messages.outboundDate.defaultMessage;
    const adult = messages.adult.defaultMessage;
    fireEvent.change(getByLabelText(origin), { target: { value: QUEBEC } });
    fireEvent.change(getByLabelText(destination), {
      target: { value: MONTREAL },
    });
    const yesterday = new Date(Date.now() - 2 * 24 * 3600 * 1000);
    fireEvent.change(getByLabelText(outboundDate), {
      target: { value: new Date(yesterday).toISOString().split('T')[0] },
    });
    fireEvent.change(getByLabelText(adult), { target: { value: 2 } });
    fireEvent.click(container.querySelector('button[type="submit"]'));

    expect(submitSpy).not.toHaveBeenCalled();
  });
});
