import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import headerLinksStyle from "../../assets/jss/components/headerLinksStyle";
import LanguageSwitchButton from "../i18n/LanguageSwitchButton";

function HeaderLinks(props) {
  const { classes } = props;

  return (
    <List className={classes.list + " " + classes.mlAuto}>
      <ListItem className={classes.listItem}>
        <LanguageSwitchButton />
      </ListItem>
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
