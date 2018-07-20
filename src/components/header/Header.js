import React, { Component } from "react";
// Third party libraries
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
// Components imports
import Logo from "./Logo";
import Menu from "./Menu";
// Inner imports
import "./Header.css";

class Header extends Component {
  state = {
    menuOpened: false
  };

  closeMenu = () => {
    this.setState({
      menuOpened: false
    });
  };

  openMenu = () => {
    this.setState({
      menuOpened: true
    });
  };

  render() {
    return (
      <AppBar position="fixed" color="default">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" onClick={this.openMenu}>
            <MenuIcon />
          </IconButton>
          <div className="header__logo">
            <Logo />
          </div>
        </Toolbar>
        <Menu opened={this.state.menuOpened} askClosing={this.closeMenu} />
      </AppBar>
    );
  }
}

export default Header;
