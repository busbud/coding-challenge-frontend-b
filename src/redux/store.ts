import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import searchReducer from "./features/search";
import ticketsReducer from "./features/tickets";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    tickets: ticketsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
