import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    background-color: #ffffff;
    color: #35393c;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }
`