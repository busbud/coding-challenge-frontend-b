import types from './action-types';
import { Operator, OperatorState } from './state';

export default {
  [types.SET_OPERATORS](
    state: OperatorState,
    operators: Operator[]
  ): OperatorState {
    return {
      ...state,
      operators,
    };
  },
};
