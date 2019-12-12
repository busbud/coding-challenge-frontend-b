import React from "react";
import { hot } from "react-hot-loader";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import "./App.css";

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io"
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1> Hello, World! </h1>
      </div>
    </ApolloProvider>
  );
};

export default hot(module)(App);
