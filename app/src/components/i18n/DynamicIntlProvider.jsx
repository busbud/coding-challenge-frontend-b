import React from "react";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";

import messages_en from "../../messages/messages_en.json";
import messages_fr from "../../messages/messages_fr.json";

const messages = {
  en: messages_en,
  fr: messages_fr,
};

const languageWithRegionCode =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;
const defaultLocale = languageWithRegionCode.toLowerCase().split(/[-_]/)[0];

const ConnectedIntlProvider = (props) => {
  const locale = props.locale ? props.locale : defaultLocale;
  return (
    <IntlProvider
      key={locale}
      locale={locale}
      messages={messages[locale]}
      textComponent={React.Fragment}
    >
      {props.children}
    </IntlProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    locale: state.i18n.locale,
  };
};
const DynamicIntlProvider = connect(mapStateToProps)(ConnectedIntlProvider);
export default DynamicIntlProvider;
