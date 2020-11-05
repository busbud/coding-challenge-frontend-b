import styled, { css } from 'styled-components';

export const BannerWrapper = styled.div`
  backdrop-filter: blur(3px);
  width: 100%;
  opacity: .7;
  padding: 12px 16px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  ${({ fixedTo }) => fixedTo && css`
    position: fixed;
    width: 100%;
    z-index: 4;
    bottom: ${fixedTo === 'bottom' ? 0 : 'none'};
    top: ${fixedTo === 'top' ? 0 : 'none'};
    box-shadow: ${({ theme }) => theme.mainBoxShadow};
  `}
  ${({ theme, type }) => {
    switch (type) {
      case 'error': return css`
        background: ${theme.colors.danger}60;
        &::after {
          background: ${theme.colors.danger};
        }
        h4{
          color: ${theme.colors.danger};
        }
        p {
          color: #000000;
        }
        button, a {
          &:hover {
            background: #FFFFFF;
            color: ${theme.colors.danger};
          }
        }
      `;
      case 'highlight': return css`
        background: ${theme.colors.highlight};
        height: fit-content;
        padding: 24px;
        opacity: 1;
        &::after {
          display: none;
        }
        h4{
          color: ${theme.colors.primary};
          font-size: 24px;
        }
        p {
          color: ${theme.colors.primary};
        }
        button, a {
          display: block;
          width: max-content;
          &:hover {
            color: ${theme.colors.primaryShade2};
          }
        }
        @media screen and (max-width: 667px){
          flex-direction: column;
          justify-content: flex-start;
        }
      `;
      default: return css`
        background: ${theme.colors.secondary};
        &::after {
          background: ${theme.colors.primary};
        }
        h4{
          color: ${theme.colors.secondary};
        }
      `;
    }
  }}
  &:hover {
    opacity: 1;
  }

  &::after {
    content: "";
    height: 100%;
    width: 4px;
    left: 0;
    top: 0;
    display: block;
    position: absolute;
  }
  h4, p {
    text-align: ${({ textAlign }) => textAlign};
  }
  a, h4, p {
    margin: 0;
  }

  h4 {
      margin-bottom: 4px;
  }

  button, a {
    background: #ffffff;
    color: #000000;
    text-decoration: none;
  }
  a {
    padding: 8px 12px;
    border-radius: 25px;
  }

  button {
    width: 30px;
    height: 30px;
    border: none;
    margin-left: 16px;
    cursor: pointer;
    position: relative;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: transparent;
    outline: none;
    align-self: center;
    &::before, &::after {
      content: "";
      display: block;
      position: absolute;
      width: 2px;
      height: 70%;
      background: #000000;
    }
    &::before {
      transform: rotate(-45deg);
    }
    &::after {
      transform: rotate(45deg);
    }
    &:hover {
      color: transparent;
    }
  }
`;

export const ContentWrapper = styled.div`
  ${({ type }) => type === 'highlight' && css`
    flex-grow: 1;
    padding-right: 24px;
    @media screen and (max-width: 667px){
      padding-right: 0;
      width: 80%;
      margin: 0 auto;
      h4, p {
        text-align: center;
      }
    }
  `}
`;
