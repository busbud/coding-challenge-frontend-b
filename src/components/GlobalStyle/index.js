import { createGlobalStyle, css } from 'styled-components';

export const sectionStyle = css`
    width: 80%;
    padding: 32px 0;
    @media screen and (max-width: 667px){
        width: 100%;
        padding: 0 16px;
        box-sizing: border-box;
    }
    margin: 0 auto;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
    transition: background .4s ease-in-out, color .4s ease-in-out;
    font-family: sans-serif;
    margin: 0;
  }
  #root {
    background-image: ${({ theme }) => theme.colors.mainGradient};
  }
`;

export default GlobalStyle;
