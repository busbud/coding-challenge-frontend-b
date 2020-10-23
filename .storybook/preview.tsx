import React from "react";
import { addDecorator } from "@storybook/react";
import Layout from "./StoryLayout";
import { I18nextProvider } from "react-i18next";
import { i18n } from "../i18n";

addDecorator((storyFn) => (
  <I18nextProvider i18n={i18n}>
    <Layout>{storyFn()}</Layout>
  </I18nextProvider>
));

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
