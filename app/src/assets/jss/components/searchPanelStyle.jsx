import { whiteColor } from "../base";

const searchPanelStyle = (theme) => ({
  form: {
    paddingTop: "20px",
  },
  input: {
    backgroundColor: whiteColor,
  },
  [theme.breakpoints.down("md")]: {
    input: {
      marginTop: "10px",
    },
  },
});

export default searchPanelStyle;
