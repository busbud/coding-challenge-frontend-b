import React from 'react';
import Head from 'next/head';

import { defaultMetaValues, IHeadParams } from '@root/constants/defaultMeta';

export const HTMLHead: React.FC<IHeadParams> = ({
  canonicalURL,
  description,
  keywords,
  language,
  opengraphImageURL,
  title,
}: IHeadParams) => (
  <Head>
    <title>{title || defaultMetaValues.title}</title>
    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
    />
    <meta
      name="description"
      content={description || defaultMetaValues.description}
    />
    <meta
      name="keywords"
      content={(keywords || defaultMetaValues.keywords || []).join(', ')}
    />
    <meta property="twitter:title" content={title || defaultMetaValues.title} />
    <meta
      property="twitter:description"
      content={description || defaultMetaValues.description}
    />
    <meta property="og:title" content={title || defaultMetaValues.title} />
    <meta
      property="og:description"
      content={description || defaultMetaValues.description}
    />
    <meta
      property="og:image"
      content={opengraphImageURL || defaultMetaValues.opengraphImageURL}
    />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={defaultMetaValues.siteName} />
    {canonicalURL && <link rel="canonical" href={canonicalURL} />}
    <meta
      httpEquiv="content-language"
      content={language || defaultMetaValues.language}
    />
    <meta name="robots" content="all" />
    <link href="https://wax-o.com/" rel="publisher" />
    <meta name="author" content="Fabien Huet" />

    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />

    <link
      href="https://fonts.googleapis.com/css2?family=Bungee&display=swap"
      rel="stylesheet"
    />
  </Head>
);
