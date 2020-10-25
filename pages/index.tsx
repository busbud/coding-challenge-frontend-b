import BudAlert from '@/components/BudAlert';
import BudButton from '@/components/BudButton/BudButton';
import BudDepartures from '@/components/BudDepartures';
import BudInput from '@/components/BudInput/BudInput';
import BudSelect from '@/components/BudSelect/BudSelect';
import useLoading from '@/hooks/useLoading';
import { useTranslation } from '@/i18n';
import {
  DEFAULT_DATE_STRING,
  getDepartures,
  MONTREAL_GEOHASH,
  QUEBEC_GEOHASH,
} from '@/services/departures';
import { Store } from '@/store';
import types from '@/store/departures/action-types';
import typesOperators from '@/store/operators/action-types';
import typesMessages from '@/store/messages/action-types';
import { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';

type OptionsMapper = {
  [index: string]: string;
};

const optionsMapper: OptionsMapper = {
  Québec: QUEBEC_GEOHASH,
  Montréal: MONTREAL_GEOHASH,
};

const options = Object.keys(optionsMapper);
const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

const Index: NextPage = () => {
  const [t] = useTranslation('common');
  const { loading, withLoading } = useLoading();
  const [from, setFrom] = useState(optionsMapper['Québec']);
  const [destination, setDestination] = useState(optionsMapper['Montréal']);
  const [departureDate, setDepartureDate] = useState(DEFAULT_DATE_STRING);
  const [fetched, setFetched] = useState(false);

  const {
    departure: { dispatch: dispatchDepartures, departures },
    operator: { dispatch: dispatchOperators, operators },
    message: { dispatch: dispatchMessage, message },
  } = useContext(Store);

  const queryDepartures = withLoading(async () => {
    try {
      const {
        departures: fetchedDepartures,
        operators: fetchedOperators,
      } = await getDepartures({
        from,
        destination,
        departureDate,
      });

      if (!fetchedDepartures.length) {
        dispatchMessage({
          type: typesMessages.SET_ALERT,
          payload: { text: t('No data available') },
        });
      }

      dispatchDepartures({
        type: types.SET_DEPARTURES,
        payload: fetchedDepartures,
      });
      dispatchOperators({
        type: typesOperators.SET_OPERATORS,
        payload: fetchedOperators,
      });
    } catch (error) {
      dispatchMessage({
        type: typesMessages.SET_ALERT,
        payload: { text: error?.message },
      });
    }
  });

  useEffect(() => {
    if (!departures.length && !loading && !fetched) {
      queryDepartures();
      setFetched(true);
    }
  }, [departures, loading, fetched, queryDepartures]);

  return (
    <div>
      <BudAlert
        title={message.text}
        visible={message.openAlert}
        onTimeout={() =>
          dispatchMessage({ type: typesMessages.CLOSE_ALERT })}
      />
      <div className="bg-gradient-to-t from-blue-400 to-blue-600 px-8 sm:px-0 py-4 pb-24">
        <div className="max-w-xl mx-auto">
          <h1 className="text-left">
            <span className="block text-xl text-white leading-tight">
              {t('Stay safe')}
            </span>
            <span className="block text-4xl text-white font-bold leading-none my-2">
              {t('Travel responsibly')}
            </span>
          </h1>
          <div className="mt-3 flex flex-col sm:flex-row">
            <BudSelect
              options={options}
              onChange={ev =>
                setFrom(optionsMapper[ev.target.value])}
              defaultValue={options[0]}
              className="sm:mr-4 my-2 sm:my-0"
            />
            <BudSelect
              options={options}
              onChange={ev =>
                setDestination(optionsMapper[ev.target.value])}
              defaultValue={options[1]}
              className="sm:mr-4 my-2 sm:my-0"
            />
            <BudInput
              type="date"
              className="my-2 sm:my-0"
              min={yesterday.toISOString().split('T')[0]}
              value={departureDate}
              onChange={ev => {
                setDepartureDate(ev.target.value);
              }}
            />
          </div>
          <div className="mt-8 text-center">
            <BudButton
              onClick={() =>
                queryDepartures()}
              loading={loading}
            >
              {t('Search')}
            </BudButton>
          </div>
        </div>
      </div>
      <div className="-mt-20">
        <BudDepartures
          departures={departures}
          operators={operators}
          loading={loading}
        />
      </div>
    </div>
  );
};

Index.getInitialProps = async () =>
  ({
    namespacesRequired: ['common'],
  });

export default Index;
