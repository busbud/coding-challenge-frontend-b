import { Reducer } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type DispatchAction = {
  [index: string]: any;
  type: string;
  payload?: unknown;
};

type ActionType = (actions: {
  [x: string]: (state: any, payload: any) => any;
}) => Reducer<any, any>;

const createReducers: ActionType = actions =>
  (
    state: unknown,
    { type, payload }: DispatchAction
  ) =>
    actions[type]?.(state, payload) || state || null;

export default createReducers;
