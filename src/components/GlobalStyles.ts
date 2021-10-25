import { colors, fonts } from "@/theme";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: ${fonts.body};
    color: ${colors.dark};
    background: url("/bg.svg") no-repeat center center / cover;
    background-attachment: fixed;
  }

  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
