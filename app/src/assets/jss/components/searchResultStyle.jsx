import { grayColor, pricingColor } from "../base";

const searchPanelStyle = (theme) => ({
  card: {
    marginTop: "10px",
    width: "90%",
  },
  result: {
    textAlign: "left",
  },
  logo: {
    float: "left",
  },
  icon: {
    "& svg": {
      verticalAlign: "middle",
    },
  },
  price: {
    textAlign: "right",
    fontSize: "1.4285714286rem",
    lineHeight: "1.4285714286rem",
    color: pricingColor,
  },
  time: {
    display: "inline-block",
    width: "4.5em",
    marginLeft: ".5714285714rem !important",
    textAlign: "right",
    fontSize: "16px",
  },
  location: {
    marginLeft: ".5714285714rem !important",
    fontSize: "14px",
  },
  origin: {
    color: "#0a3b5f",
  },
  originHighlight: {
    color: pricingColor,
  },
  destination: {
    color: grayColor,
  },
  duration: {
    display: "inline",
    fontSize: "1rem",
    marginLeft: ".5714285714rem !important",
    verticalAlign: "top",
    "& svg": {
      verticalAlign: "middle",
      float: "left",
    },
  },
  button: {
    float: "right",
    paddingBottom: "10px",
  },
});

export default searchPanelStyle;
