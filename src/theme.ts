import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: "rgb(233, 56, 216)",
      main: "rgb(96, 54, 148)",
    },
    secondary: {
      main: red[500],
    },
  },
});
