import LoadingImage from "../../assets/img/loading.gif";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Sunburst from "../../assets/img/sunburst.svg";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: "center",
    backgroundImage: `url(${Sunburst})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: theme.palette.primary.light,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
  },
  image: {
    display: "flex",
    width: "50%",
  },
  title: {
    width: "80%",
  },
}));
export const Loading = (): React.ReactElement<"div"> => {
  const { t } = useTranslation();
  const classes = useStyles();

  const title = t("loading");
  const image = (
    <img alt={t("osheaga")} className={classes.image} src={LoadingImage} />
  );
  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="h1">
        {title}
      </Typography>
      {image}
    </div>
  );
};
