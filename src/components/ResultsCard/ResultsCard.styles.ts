// NOTE: linting disabled due to styleing requirements
// .... I realy should just update the exceptions in the
// eslintrc... but... lazy
// TRB 11/14/2020
/* eslint-disable no-magic-numbers */
import { makeStyles } from "@material-ui/core/styles";

// NOTE: please forgive the `important` declarations below,
// I know is is a horrible, terrible, no-good, very bad
// thing to do, but I was running into problems with the
// custom mui theme colors being stomped
// TRB 11/15/2020
export const useStyles = makeStyles((theme) => ({
  date: {
    display: "block",
    marginBottom: theme.spacing(1),
  },
  pos: {
    marginBottom: theme.spacing(3),
  },
  root: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    border: `2px solid ${theme.palette.primary.light} !important`,
    margin: theme.spacing(1),
    maxHeight: 324,
    maxWidth: 324,
    minHeight: 324,
    minWidth: 324,
    [theme.breakpoints.down("sm")]: {
      borderRadius: 0,
      flexGrow: 1,
      marginLeft: "-2px",
      maxWidth: "100%",
      minWidth: "100%",
      width: "100%",
    },
  },
  seats: {
    fontSize: theme.spacing(1.5),
    fontStyle: "italic",
  },
  title: {
    fontSize: theme.spacing(4),
  },
}));

export const useCardActionStyles = makeStyles(() => ({
  root: {
    justifyContent: "space-around",
  },
}));

export const useCardContentStyles = makeStyles(() => ({
  root: {
    dispay: "flex",
    height: 244,
    justifyContent: "center",
  },
}));
