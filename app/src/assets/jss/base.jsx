/* Fonts */
const defaultFont = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: "300",
  lineHeight: "1.5em",
};
/* Colors */
const primaryColor = "#0274CA";
const secondaryColor = "#FBAE17";
const successColor = "#009944";
const errorColor = "#cf000f";
const warnColor = "#f0541e";
const infoColor = "#63c0df";
const pricingColor = "#127ccb";
const whiteColor = "#FFF";
const blackColor = "#000";
const grayColor = "#999";
/* Containers */
const containerFluid = {
  paddingRight: "15px",
  paddingLeft: "15px",
  marginRight: "auto",
  marginLeft: "auto",
  width: "100%",
};
const container = {
  ...containerFluid,
  "@media (min-width: 576px)": {
    maxWidth: "540px",
  },
  "@media (min-width: 768px)": {
    maxWidth: "720px",
  },
  "@media (min-width: 992px)": {
    maxWidth: "960px",
  },
  "@media (min-width: 1200px)": {
    maxWidth: "1140px",
  },
};
const drawerWidth = 260;
/* Effects */
const hexToRgb = (input) => {
  input = input + "";
  input = input.replace("#", "");
  let hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error("invalid hex color: " + input);
  }
  if (input.length === 3) {
    let first = input[0];
    let second = input[1];
    let last = input[2];
    input = first + first + second + second + last + last;
  }
  input = input.toUpperCase();
  let first = input[0] + input[1];
  let second = input[2] + input[3];
  let last = input[4] + input[5];
  return (
    parseInt(first, 16) +
    ", " +
    parseInt(second, 16) +
    ", " +
    parseInt(last, 16)
  );
};
const transition = {
  transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)",
};
const boxShadow = {
  boxShadow:
    "0 10px 30px -12px rgba(" +
    hexToRgb(blackColor) +
    ", 0.42), 0 4px 25px 0px rgba(" +
    hexToRgb(blackColor) +
    ", 0.12), 0 8px 10px -5px rgba(" +
    hexToRgb(blackColor) +
    ", 0.2)",
};
const mlAuto = {
  marginLeft: "auto",
};
const mrAuto = {
  marginRight: "auto",
};
export {
  defaultFont,
  primaryColor,
  secondaryColor,
  successColor,
  errorColor,
  warnColor,
  infoColor,
  blackColor,
  pricingColor,
  whiteColor,
  grayColor,
  containerFluid,
  container,
  drawerWidth,
  hexToRgb,
  transition,
  boxShadow,
  mlAuto,
  mrAuto,
};
