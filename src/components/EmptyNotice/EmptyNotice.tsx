import { shallowEqual, useSelector } from "react-redux";
import ErrorImage from "../../assets/img/error.svg";
import { makeStyles } from "@material-ui/core/styles";
import OsheagaLogo from "../../assets/img/osheagaLogo.svg";
import React from "react";
import Sunburst from "../../assets/img/sunburst.svg";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${Sunburst})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: theme.palette.primary.light,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
  },
}));
export const EmptyNotice = (): React.ReactElement<"div"> => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [hasSearched, hasError]: [boolean, boolea] = useSelector(
    (state: TApplicationState) => {
      return [state.schedules.loaded, Boolean(state.schedules.error)];
    },
    shallowEqual
  );

  let title = hasSearched ? t("tryAgain") : t("beginSearch");
  let prompt = hasSearched ? t("tryAgainPrompt") : t("beginSearchPrompt");
  let image = hasSearched ? null : <img alt={t("osheaga")} src={OsheagaLogo} />;
  if (hasError) {
    image = <img alt={t("osheaga")} src={ErrorImage} />;
    title = t("errorEncoutered");
    prompt = t("errorEncouteredPrompt");
  }
  return (
    <div className={classes.container}>
      <Typography variant="h1">{title}</Typography>
      {image}
      <Typography variant="h4">{prompt}</Typography>
    </div>
  );
};
