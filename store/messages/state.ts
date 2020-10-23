import { Message } from './actions';

export type MessageState = {
  message: Message;
};

export default {
  message: { text: '', type: 'warn', openAlert: false },
} as MessageState;
