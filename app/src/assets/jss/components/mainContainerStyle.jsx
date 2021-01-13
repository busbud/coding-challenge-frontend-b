import { blackColor } from "../base";

const mainContainerStyle = (theme) => ({
  app: {
    backgroundImage:
      "linear-gradient(280deg, #F0FFF7 0%, #E6F6FF 100%), linear-gradient(280deg, #FFFCE6 0%, #E0FFEA 100%)",
    textAlign: "center",
  },
  main: {
    paddingTop: "10vh",
    paddingBottom: "10px",
    minHeight: "20vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: blackColor,
    overflow: "auto",
    [theme.breakpoints.down("md")]: {
      paddingTop: "20vh",
    },
  },
  logo: {
    paddingTop: "1vmin",
    height: "10vmin",
    pointerEvents: "none",
    [theme.breakpoints.down("md")]: {
      height: "15vmin",
    },
  },
});

export default mainContainerStyle;
