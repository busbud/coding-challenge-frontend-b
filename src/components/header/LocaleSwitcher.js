import React, { Component } from "react";
// Third party libraries
import counterpart from "counterpart";
import Translate from "react-translate-component";
// Components imports
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

class LocaleSwitcher extends Component {
  state = {
    locale: counterpart.getLocale()
  };

  localeChange = event => {
    this.setState({ locale: event.target.value });
    counterpart.setLocale(event.target.value);
  };

  render() {
    return (
      <div>
        <FormControl>
          <InputLabel htmlFor="age-helper">
            <Translate content="menu.language.label" />
          </InputLabel>
          <Select
            value={this.state.locale}
            onChange={this.localeChange}
            name="locale"
          >
            <MenuItem value="fr">Français</MenuItem>
            <MenuItem value="en">English</MenuItem>
          </Select>
          <FormHelperText>
            <Translate content="menu.language.helper" />
          </FormHelperText>
        </FormControl>
      </div>
    );
  }
}

export default LocaleSwitcher;
