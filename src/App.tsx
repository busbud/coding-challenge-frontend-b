import React from "react";
import Layout from "./components/Layout";
import Routing from "./Routing";

function App(): JSX.Element {
  return (
    <Layout>
      <Routing />
    </Layout>
  );
}

export default App;
