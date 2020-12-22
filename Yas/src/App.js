import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import configureStore from './store';
import { BoardingPage } from "./components/Boarding";
const store = configureStore();

export const App = () => {
  return (
    <Provider store={store}>
      <BoardingPage />
    </Provider>
  );
};

export default App;
