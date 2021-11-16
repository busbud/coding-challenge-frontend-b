import React, { ReactElement } from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { RootState } from "./redux/store";
import searchReducer from "./redux/features/search";
import ticketsReducer from "./redux/features/tickets";

interface CustomRenderOptions extends RenderOptions {
  preloadedState?: RootState;
}

const initPreloadedState: RootState = {
  search: { adult: 0, senior: 0, child: 0 },
  tickets: {
    complete: false,
    tickets: [],
    locations: [],
    cities: [],
    loading: false,
    fetchedOneTime: false,
  },
};

const customRender = (
  ui: ReactElement,
  { preloadedState, ...renderOptions }: CustomRenderOptions = {
    preloadedState: initPreloadedState,
  }
): RenderResult => {
  const store = configureStore({
    reducer: { tickets: ticketsReducer, search: searchReducer },
    preloadedState,
  });
  const AllTheProviders: React.FC = ({ children }) => (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );

  return render(ui, { wrapper: AllTheProviders, ...renderOptions });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
