/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store } from '@/store';
import types from '@/store/loading/action-types';
import { useContext } from 'react';

const useLoading = (): {
  withLoading: (fn: (...args: any) => void) => (...args: any) => Promise<void>;
  loading: boolean;
  conditionalLoading: (condition: boolean) => void;
} => {
  const {
    loading: { dispatch, loading },
  } = useContext(Store);

  const open = () =>
    dispatch({ type: types.OPEN_PAGE_LOADER });
  const close = () =>
    dispatch({ type: types.CLOSE_PAGE_LOADER });

  /**
   * A helper to call a function right after the page loader is called.
   * This should avoid to call open/closed every time we want to make
   * an API call for example.
   *
   * @param fn A function to be called after page loader is called
   */
  const withLoading = (fn: (...unknownArgs: any) => void) =>
    async (
      ...args: any
    ) => {
      open();
      await fn(...args);
      close();
    };

  /**
   * A helper to call a function based on condition passed. If condition is true,
   * then the loading store action is called. Otherwise, it will be closed
   *
   * @param condition The condition to evaluate before trigger the loading store action
   */
  const conditionalLoading = (condition: boolean) => {
    if (condition) {
      open();
    } else {
      close();
    }
  };

  return { withLoading, loading, conditionalLoading };
};

export default useLoading;
