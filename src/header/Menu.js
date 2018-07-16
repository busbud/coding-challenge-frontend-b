import React, { Component } from "react";
import PropTypes from "prop-types";
// Third party libraries
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import HelpOutline from "@material-ui/icons/HelpOutline";
import DirectionsBus from "@material-ui/icons/DirectionsBus";
import Translate from "react-translate-component";
// Components imports
import LocaleSwitcher from "./LocaleSwitcher";
// Inner imports
import "./Menu.css";

class Menu extends Component {
  render() {
    const { opened, askClosing } = this.props;

    return (
      <Drawer open={opened} onClose={askClosing}>
        {/*<div
          tabIndex={0}
          role="button"
          onClick={askClosing}
          onKeyDown={askClosing}
        >*/}
        <div>
          <List component="nav">
            <ListItem button>
              <ListItemIcon>
                <DirectionsBus />
              </ListItemIcon>
              <ListItemText
                primary={<Translate component="None" content="menu.travel" />}
              />
            </ListItem>
            <ListItem
              button
              component="a"
              href="https://www.osheaga.com"
              target="_blank"
            >
              <ListItemIcon>
                <HelpOutline />
              </ListItemIcon>
              <ListItemText
                primary={<Translate component="None" content="menu.about" />}
              />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemText primary={<LocaleSwitcher />} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    );
  }
}

Menu.propTypes = {
  opened: PropTypes.bool.isRequired,
  askClosing: PropTypes.func.isRequired
};

export default Menu;
