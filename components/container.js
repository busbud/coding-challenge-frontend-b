import React from "react";
import Head from "next/head";
import Navigation from "./navigation";

const Container = (props) => {
  return (
    <div>
      <Head></Head>
      <Navigation />

      <div>{props.children}</div>
    </div>
  );
};

export default Container;
