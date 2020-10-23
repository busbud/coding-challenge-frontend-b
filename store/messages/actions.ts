import types from './action-types';
import { MessageState } from './state';

export type Message = {
  text: string | undefined;
  openAlert: boolean;
  type: 'error' | 'info' | 'success' | 'warn';
};

export default {
  [types.SET_ALERT](state: MessageState, message: Message): MessageState {
    return {
      ...state,
      message: {
        ...message,
        openAlert: true,
      },
    };
  },
  [types.OPEN_ALERT](state: MessageState): MessageState {
    return { ...state, message: { ...state.message, openAlert: true } };
  },
  [types.CLOSE_ALERT](state: MessageState): MessageState {
    return { ...state, message: { ...state.message, openAlert: false } };
  },
};
