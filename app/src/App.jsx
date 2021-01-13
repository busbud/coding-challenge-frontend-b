import React from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { setLocale } from "./state/actions";
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";

import Helmet from "./components/Helmet/CustomHelmet";
import Header from "./components/Header/Header";
import HeaderLinks from "./components/Header/HeaderLinks";
import SearchPanel from "./components/SearchPanel/SearchPanel";
import SearchResults from "./components/SearchResults/SearchResults";

import logo from "./OSheagaFestivalMusiqueEtArts.svg";
import mainContainerStyle from "./assets/jss/components/mainContainerStyle";

class App extends React.Component {
  render() {
    const { classes } = this.props;
    const currentLang = this.props.locale;
    const description = this.props.intl.formatMessage({ id: "description" });

    return (
      <div className={classes.app}>
        <Helmet lang={currentLang} metaDescription={description} />
        <Header links={<HeaderLinks />} />
        <Container className={classes.main}>
          <img
            src={logo}
            className={classes.logo}
            alt="Osheaga Festival Musique et Arts"
          />
          <SearchPanel />
          <SearchResults />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    locale: state.i18n.locale,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLocale: (locale) => dispatch(setLocale(locale)),
  };
};

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(mainContainerStyle)(App))
);
