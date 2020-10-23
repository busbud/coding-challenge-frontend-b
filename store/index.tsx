import { createContext, ReactNode, useMemo, useReducer } from 'react';
import { DispatchAction } from './createReducers';
import departureReducer from './departures';
import departureState from './departures/state';
import loadingReducer from './loading';
import loadingState from './loading/state';
import messageReducer from './messages';
import messageState from './messages/state';
import operatorReducer from './operators';
import operatorState from './operators/state';

type BaseState = {
  dispatch: (action: DispatchAction) => void;
};

type InitialState = {
  message: typeof messageState & BaseState;
  loading: typeof loadingState & BaseState;
  departure: typeof departureState & BaseState;
  operator: typeof operatorState & BaseState;
};

const initialState = {
  message: messageState,
  loading: loadingState,
  departure: departureState,
};

export const Store = createContext(initialState as InitialState);

type StoreProviderProps = {
  children: ReactNode;
};

export default function StoreProvider({ children }: StoreProviderProps) {
  const [stateMessage, dispatchMessage] = useReducer(
    messageReducer,
    messageState
  );

  const [stateLoading, dispatchLoading] = useReducer(
    loadingReducer,
    loadingState
  );

  const [stateDeparture, dispatchDeparture] = useReducer(
    departureReducer,
    departureState
  );

  const [stateOperator, dispatchOperator] = useReducer(
    operatorReducer,
    operatorState
  );

  const store = useMemo(
    (): InitialState =>
      ({
        message: { ...stateMessage, dispatch: dispatchMessage },
        loading: { ...stateLoading, dispatch: dispatchLoading },
        departure: { ...stateDeparture, dispatch: dispatchDeparture },
        operator: { ...stateOperator, dispatch: dispatchOperator },
      }),
    [stateMessage, stateLoading, stateDeparture, stateOperator]
  );

  return <Store.Provider value={store}>{children}</Store.Provider>;
}
