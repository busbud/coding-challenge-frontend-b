import React from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import withStyles from "@material-ui/core/styles/withStyles";
import { setLocale } from "../../state/actions";
import Dropdown from "../Dropdown/Dropdown";

import menuDropdownStyle from "../../assets/jss/components/menuDropdownStyle";

class ConnectedLanguageSwitchButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleLanguageSwitch = this.handleLanguageSwitch.bind(this);
  }

  handleLanguageSwitch(language) {
    if (this.props.locale !== language.key) {
      this.props.setLocale(language.key);
    }
  }

  render() {
    const { classes, locale } = this.props;
    const languageKey = "language." + locale;
    const dropdownList = [
      {
        key: "en",
        value: this.props.intl.formatMessage({ id: "language.en" }),
      },
      {
        key: "fr",
        value: this.props.intl.formatMessage({ id: "language.fr" }),
      },
    ];
    return (
      <Dropdown
        onClick={this.handleLanguageSwitch}
        buttonText={this.props.intl.formatMessage({ id: languageKey })}
        buttonProps={{
          className: classes.dropdown,
        }}
        dropPlacement="bottom"
        dropdownList={dropdownList.filter((element) => element.key !== locale)}
      />
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

const LanguageSwitchButton = injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(menuDropdownStyle)(ConnectedLanguageSwitchButton))
);
export default LanguageSwitchButton;
