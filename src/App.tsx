import React from "react";
import "./App.css";
import BouncingText from "./components/BouncingText";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import { connect } from "react-redux";
import { StoreState } from "./types/StoreState";
import { updateLanguage } from "./actions";
import LanguageSelect from "./components/LanguageSelect";
import Card from "./components/Card";
import BusAnimation from "./components/BusAnimation";
import Button from "./components/Button";

interface AppProps {
  language: string;
  updateLanguage: (language: string) => void;
}

class App extends React.Component<AppProps, any> {
  render() {
    const { language } = this.props;
    console.log(language);
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
            <Card className="bus-list-card">
              <h1 className="bus-list-title">{i18n.t("destination")}</h1>
              <Button className="bus-list-find-button" type="primary">
                {i18n.t("find")}
              </Button>
            </Card>
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
      updateLanguage: (language: string) => dispatch(updateLanguage(language))
    };
  }
)(App);
