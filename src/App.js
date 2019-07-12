import React, { Component } from 'react';
import './App.css';
import OnboardingPage from './OnboardingPage/OnboardingPage';
import TripListPage from './TripListPage/TripListPage';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LanguageIcon from '@material-ui/icons/Language';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IntlProvider, addLocaleData } from "react-intl";
import locale_en from 'react-intl/locale-data/en';
import locale_fr from 'react-intl/locale-data/fr';
import localeData from "./translations/data.json";
addLocaleData([...locale_en, ...locale_fr]);

const language =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

// Try full locale, try locale without region code, fallback to 'en'
const messages =
  localeData[languageWithoutRegionCode] ||
  localeData[language] ||
  localeData.en;

let i18nConfig = {
  locale: 'en',
  messages: messages
};

class App extends Component {
  constructor(props) {
    super(props);
    this.handleOnboarding = this.handleOnboarding.bind(this);
    this.state = {
      isOnboarded: false,
      anchorEl: null
    };
  }

  // onboarding action
  handleOnboarding() {
    this.setState({
      isOnboarded: true
    });
  }

  // language change
  onChangeLanguage(lang) {
    switch (lang) {
      case 'en': i18nConfig.messages = localeData[lang.toLowerCase()]; break;
      case 'fr': i18nConfig.messages = localeData[lang.toLowerCase()]; break;
      default: i18nConfig.messages = localeData[lang.toLowerCase()]; break;
    }
    this.setState({ locale: lang });
    i18nConfig.locale = lang;
  }

  // menu

  handleMenuClick = event => {
    console.log('handleMenuClick');
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemFrClick = event => {
    this.onChangeLanguage('fr');
    this.handleMenuClose();
  };

  handleMenuItemEnClick = event => {
    this.onChangeLanguage('en');
    this.handleMenuClose();
  };

  handleMenuClose = () => {
    console.log('handleMenuClose');
    this.setState({ anchorEl: null });
  };

  // render

  render() {
    const { isOnboarded, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <React.Fragment>

        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: "1", textAlign: "center" }}>
              Busbud X Osheaga
          </Typography>
            <IconButton edge="end" color="inherit" aria-label="Menu" onClick={this.handleMenuClick}>
              <LanguageIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={this.handleMenuClose}
            >
              <MenuItem onClick={this.handleMenuItemEnClick}>EN</MenuItem>
              <MenuItem onClick={this.handleMenuItemFrClick}>FR</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <IntlProvider key={i18nConfig.locale} locale={i18nConfig.locale} messages={i18nConfig.messages}>
          <React.Fragment>
            {isOnboarded === false && <OnboardingPage handleOnboarding={this.handleOnboarding} />}
            {isOnboarded === true && <TripListPage />}
          </React.Fragment>
        </IntlProvider>

      </React.Fragment>
    );
  }
}

export default App;
