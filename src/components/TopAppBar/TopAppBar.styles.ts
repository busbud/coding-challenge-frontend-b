/* eslint-disable no-magic-numbers */
import { fade, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    position: "relative",
  },
  grow: {
    flexGrow: 1,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  language: {
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(1.5),
  },
  logo: {
    height: 64,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    "&:hover": { backgroundColor: fade(theme.palette.common.white, 0.25) },
    backgroundColor: fade(theme.palette.common.white, 0.15),
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    marginRight: theme.spacing(2),
    position: "relative",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    padding: theme.spacing(0, 2),
    pointerEvents: "none",
    position: "absolute",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flexGrow: 1,
      justifyContent: "center",
    },
  },
}));
