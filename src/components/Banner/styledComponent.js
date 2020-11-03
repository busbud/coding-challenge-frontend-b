import styled from 'styled-components';

export const BannerWrapper = styled.div`
  backdrop-filter: blur(3px);
  width: 100%;
  opacity: .7;
  padding: 12px 16px;
  top: 0;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  background: ${({ theme }) => theme.colors.danger}60;
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
    background: ${({ theme }) => theme.colors.danger};
  }

  h4{
    color: ${({ theme }) => theme.colors.danger};
  }
  p {
    color: #000000;
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
    &:hover {
      background: #ffffff;
      color: ${({ theme }) => theme.colors.danger};
    }
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

export default null;
