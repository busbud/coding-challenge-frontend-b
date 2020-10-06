import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

import { SERVER_HOST } from "../constants";

type PageTitleProps = {
  title: string;
};
export const PageTitle: React.FunctionComponent<PageTitleProps> = ({
  title,
}) => {
  return (
    <Helmet titleTemplate="%s | Busbud Frontend Coding test">
      {/* Used by search engine crawlers */}
      <title>{title}</title>
      {/* Used by social media websites for sharing */}
      <meta property="og:title" name="twitter:title" content={title} />
    </Helmet>
  );
};

type PageDescriptionProps = { description: string; imageUrl?: string };
export const PageDescription: React.FunctionComponent<PageDescriptionProps> = (
  description,
  imageUrl
) => {
  return (
    <Helmet>
      {/* Used by social media websites for sharing */}
      {description && (
        <meta
          property="og:description"
          name="twitter:description"
          content={description}
        />
      )}
      {imageUrl && (
        <meta property="og:image" name="twitter:image" content={imageUrl} />
      )}
    </Helmet>
  );
};

type CanonicalProps = { path: string };
export const Canonical: React.FunctionComponent<CanonicalProps> = ({
  path,
}) => {
  const url = new URL(path.toLocaleLowerCase(), SERVER_HOST);
  return (
    <Helmet>
      {/* Used by search engine crawlers */}
      <link rel="canonical" href={url.href} />
      {/* Used by social media websites for sharing */}
      <meta property="og:url" content={url.href} />
    </Helmet>
  );
};

// TODO it would be good to be able to give different paths depending on the locale
type HrefLangAlternatesProps = {};
export const HrefLangAlternates: React.FunctionComponent<HrefLangAlternatesProps> = () => {
  const { pathname, search } = useLocation();
  const url = new URL(`${pathname}${search}`.toLocaleLowerCase(), SERVER_HOST);

  return (
    <Helmet>
      <link rel="alternate" href={url.href} hrefLang="x-default" />
      <link rel="alternate" href={url.href} hrefLang="x-default" />
      <meta property="og:locale" content="en-ca" />
    </Helmet>
  );
};

type MetaProps = {
  property?: string;
  name?: string;
  content: string;
};
export const Meta: React.FunctionComponent<MetaProps> = (props) => {
  return (
    <Helmet>
      <meta {...props} />
    </Helmet>
  );
};

type SocialMediaMetaTagsProps = {
  twitterCardFormat?: "summary" | "summary_large_image" | "app" | "player";
  contentType?: string;
};
export const SocialMediaMetaTags: React.FunctionComponent<SocialMediaMetaTagsProps> = ({
  twitterCardFormat = "summary",
  contentType = "website",
}) => {
  return (
    <Helmet>
      <meta property="og:type" content={contentType} />
      <meta property="og:site_name" content="Busbud" />
      <meta name="twitter:site" content="@Busbud" />
      {/* <meta name="twitter:creator" content='@CJourneaux /> */}
      <meta name="twitter:card" content={twitterCardFormat} />
    </Helmet>
  );
};
