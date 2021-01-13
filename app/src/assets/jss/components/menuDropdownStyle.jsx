import { blackColor, whiteColor } from "../base";

const menuDropdownStyle = (theme) => ({
  dropdown: {
    width: "initial !important",
    "& span": {
      color: whiteColor,
    },
    [theme.breakpoints.down("md")]: {
      "& span": {
        color: blackColor,
      },
    },
  },
});

export default menuDropdownStyle;
