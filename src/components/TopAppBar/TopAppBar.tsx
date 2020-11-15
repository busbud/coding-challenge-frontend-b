import AppBar from "@material-ui/core/AppBar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import OsheagaLogo from "../../assets/img/osheagaLogo.svg";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./TopAppBar.styles";
import { useTranslation } from "react-i18next";

export const TopAppBar = (): React.ReactElement<"div"> => {
  const classes = useStyles();
  const { i18n, t } = useTranslation();

  const handleChangeLanguage = React.useCallback(
    (event) => {
      i18n.changeLanguage(event.target.value);
    },
    [i18n]
  );

  return (
    <div className={classes.grow}>
      <AppBar className={classes.background} position="static">
        <Toolbar>
          <div className={classes.grow}>
            <Typography noWrap className={classes.title} variant="h6">
              <img
                alt={t("osheaga")}
                className={classes.logo}
                src={OsheagaLogo}
              />
            </Typography>
          </div>
          <RadioGroup
            row
            aria-label={t("changeLanuage")}
            className={classes.language}
            name="language"
            value={i18n.language}
            onChange={handleChangeLanguage}
          >
            <FormControlLabel control={<Radio />} label="EN" value="en" />
            <FormControlLabel control={<Radio />} label="FR" value="fr" />
          </RadioGroup>
        </Toolbar>
      </AppBar>
    </div>
  );
};
/*
 */
