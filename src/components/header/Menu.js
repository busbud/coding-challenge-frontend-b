import React, { Component } from "react";
import PropTypes from "prop-types";
// Third party libraries
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import IconHelpOutline from "@material-ui/icons/HelpOutline";
import IconDirectionsBus from "@material-ui/icons/DirectionsBus";
import IconDirections from "@material-ui/icons/Directions";
import IconChevronLeft from "@material-ui/icons/ChevronLeft";
import Translate from "react-translate-component";
import { Link } from "react-router-dom";
// Components imports
import LocaleSwitcher from "./LocaleSwitcher";
// Inner imports
import "./Menu.css";

class Menu extends Component {
  render() {
    const { opened, askClosing } = this.props;

    return (
      <Drawer open={opened} onClose={askClosing} className="menu--link-nostyle">
        <div>
          <div className="menu__close-btn">
            <IconButton onClick={askClosing}>
              <IconChevronLeft />
            </IconButton>
          </div>
          <Divider />
          <List component="nav">
            <Link to="/">
              <ListItem button>
                <ListItemIcon>
                  <IconDirections />
                </ListItemIcon>
                <ListItemText
                  primary={<Translate content="menu.travel_to_oshgea" />}
                />
              </ListItem>
            </Link>
            <Link to="/travel">
              <ListItem button>
                <ListItemIcon>
                  <IconDirectionsBus />
                </ListItemIcon>
                <ListItemText
                  primary={<Translate content="menu.travel_to_anywhere" />}
                />
              </ListItem>
            </Link>
            <ListItem
              button
              component="a"
              href="https://www.osheaga.com"
              target="_blank"
            >
              <ListItemIcon>
                <IconHelpOutline />
              </ListItemIcon>
              <ListItemText primary={<Translate content="menu.about" />} />
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
