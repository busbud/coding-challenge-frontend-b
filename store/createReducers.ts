/* eslint-disable @typescript-eslint/no-explicit-any */
export type DispatchAction = {
  type: string;
  payload?: unknown;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const createReducers = (actions: any) =>
  (
    state: unknown,
    { type, payload }: DispatchAction
  ): unknown =>
    actions[type]?.(state, payload) || state || null;

export default createReducers;
