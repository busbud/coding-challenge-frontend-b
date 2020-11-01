import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
    transition: background .4s ease-in-out, color .4s ease-in-out;
    a {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.highlight};
    }
  }
`;

export default GlobalStyle;
