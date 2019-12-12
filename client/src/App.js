import React from "react";
import { hot } from "react-hot-loader";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Home from "./components/Home";
import "./App.scss";

const client = new ApolloClient({
  uri: "https://localhost:4000"
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Home />
      </div>
    </ApolloProvider>
  );
};

export default hot(module)(App);
