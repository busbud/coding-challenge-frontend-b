import { createContext, ReactNode, useMemo, useReducer } from 'react';
import {
  reducer as departureReducer,
  state as departureState,
} from './departures';
import { reducer as loadingReducer, state as loadingState } from './loading';
import { reducer as messageReducer, state as messageState } from './messages';
import {
  reducer as operatorReducer,
  state as operatorState,
} from './operators';
import type { DispatchAction } from './createReducers';
import type { DepartureState } from './departures/state';
import type { LoadingState } from './loading/state';
import type { MessageState } from './messages/state';
import type { OperatorState } from './operators/state';

type BaseState = {
  dispatch: (action: DispatchAction) => void;
};

type InitialState<T> = {
  message: MessageState & T;
  loading: LoadingState & T;
  departure: DepartureState & T;
  operator: OperatorState & T;
};

const initialState = {
  message: messageState,
  loading: loadingState,
  departure: departureState,
};

export const Store = createContext(initialState as InitialState<BaseState>);

type StoreProviderProps = {
  children: ReactNode;
};

export default function StoreProvider({
  children,
}: StoreProviderProps): JSX.Element {
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
    (): InitialState<BaseState> =>
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
