import React from "react";
import "./App.css";
import BouncingText from "./components/ui/BouncingText";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import { connect } from "react-redux";
import { StoreState } from "./types/StoreState";
import { updateLanguage, fetchDepartures } from "./actions";
import LanguageSelect from "./components/LanguageSelect";
import BusAnimation from "./components/ui/BusAnimation";
import DeparturesForm from "./components/DeparturesForm";
import DeparturesList from "./components/DeparturesList";
import Button from "./components/ui/Button";

interface AppProps {
  language: string;
  updateLanguage: (language: string) => void;
  fetchDepartures: (
    origin: string,
    destination: string,
    outboundDate: string
  ) => void;
}

class App extends React.Component<AppProps, any> {
  searchDepartures = () => {
    const newYorkGeohash = "dr5reg";
    const mtlGeohash = "f25dvk";
    const outboundDate = "2020-08-02";
    this.props.fetchDepartures(newYorkGeohash, mtlGeohash, outboundDate);
  };
  render() {
    const { language } = this.props;
    i18n.changeLanguage(language);
    return (
      <I18nextProvider i18n={i18n}>
        <div className="app">
          <LanguageSelect
            updateLanguage={this.props.updateLanguage}
            currentLanguage={language}
          />
          <div className="hero">
            <BouncingText
              colors={[
                "gold",
                "#e79b5a",
                "#74c8ce",
                "#00ff8e",
                "#d77fdf",
                "#d37c9d",
                "#ee4343"
              ]}
              fontSize={128}
            >
              Osheaga
            </BouncingText>
            <h1 className="hero-subtitle">FESTIVAL MUSIQUE ET ARTS</h1>
          </div>
          <section className="content">
            <p className="content-introduction">{i18n.t("Introduction")}</p>
          </section>
          <section className="content content--onboarding">
            <BusAnimation />
            <DeparturesForm
              searchDepartures={this.searchDepartures}
              title={i18n.t("destination")}
              submitText={i18n.t("find")}
            />
          </section>
          <section className="content content--departures">
            <DeparturesList selectText={i18n.t("select")} />
          </section>
          <p className="footer">{i18n.t("footer")}</p>
        </div>
      </I18nextProvider>
    );
  }
}

export default connect(
  ({ language }: StoreState) => {
    return {
      language
    };
  },
  (dispatch: any) => {
    return {
      updateLanguage: (language: string) => dispatch(updateLanguage(language)),
      fetchDepartures: (
        origin: string,
        destination: string,
        outboundDate: string
      ) =>
        dispatch(fetchDepartures(origin, destination, outboundDate, false, 0))
    };
  }
)(App);
