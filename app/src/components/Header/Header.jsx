// React
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
// nodejs library that concatenates classes
import classNames from "classnames";
// Material-UI HigherOrderComponent styling
import withStyles from "@material-ui/core/styles/withStyles";
// Material-UI Core Components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
import Close from "@material-ui/icons/Close";
import Brand from "../Brand/Brand";
// Logo
import logo from "../../logo.svg";
// Styles
import headerStyle from "../../assets/jss/components/headerStyle";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }

  handleDrawerToggle() {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  render() {
    const { classes, links, intl } = this.props;
    const title = intl.formatMessage({ id: "title" });

    return (
      <AppBar
        className={classNames(classes.appBar, classes.absolute, classes.fixed)}
      >
        <Toolbar className={classes.container}>
          <Brand logo={logo} logoAltText={title} />
          <Hidden smDown implementation="css" className={classes.hidden}>
            <div className={classes.collapse}>{links}</div>
          </Hidden>
          <Hidden mdUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Hidden>
        </Toolbar>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={"right"}
            open={this.state.mobileOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
            onClose={this.handleDrawerToggle}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.closeButtonDrawer}
            >
              <Close />
            </IconButton>
            <div className={classes.appResponsive}>{links}</div>
          </Drawer>
        </Hidden>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  links: PropTypes.node.isRequired,
  name: PropTypes.string,
  brand: PropTypes.node,
};

export default injectIntl(withStyles(headerStyle)(Header));
