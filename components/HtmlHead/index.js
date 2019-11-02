import React, { useContext } from "react";
import Head from "next/head";

import { IntlContext } from "../../pages/_app";
import { getTransaltion } from "../../utils/translation";

export default function HtmlHead() {
  const { language } = useContext(IntlContext);
  return (
    <Head>
      <title>{getTransaltion("siteTitle", language)}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
}
