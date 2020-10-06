import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { HelmetProvider } from "react-helmet-async";

import { AppRouting } from "./app-routing";

require("dotenv").config();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <CSSReset />
      <HelmetProvider>
        <AppRouting />
      </HelmetProvider>
    </ThemeProvider>
  </React.StrictMode>,
  rootElement
);
