import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: block;
  min-height: 48px;
  padding-left: 20px;
  z-index: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;


export const StopDetails = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    color: ${({ theme }) => theme.colors.secondary};
    font-family: sans-serif;
  }
  .stop-name{
    display: flex;
    &::before{
      display: block;
      position: absolute;
      align-self: center;
      z-index: 2;
      content: "";
      left: 0;
      background: ${({ theme }) => theme.colors.primaryShade2};
      border: solid 2px ${({ theme }) => theme.colors.highlight};
      width: 9px;
      height: 9px;
      border-radius: 16px;
    }
    &::after {
      content: "";
      display: block;
      z-index: 1;
      width: 3px;
      position: absolute;
      background: ${({ theme }) => theme.colors.highlight};
      left: 5px;
      height: calc(100% + 16px);
      top: 50%;
      transform: translateY(-50%);
      ${({ isLastOfRoute }) => isLastOfRoute && css`
        height: 60%;
        top: -8px;
        transform: translateY(0);
      `};
      ${({ isFirstOfRoute }) => isFirstOfRoute && css`
        height: 55%;
        bottom: -8px;
        top: unset;
        transform: translateY(0);
      `}
    }
  }
`;

export const RoutesWrapper = styled.div`
  display: flex;
`;

export const LinesWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
  div {
    margin-right: 6px;
    &:last-child{
      margin-right: 0;
    }
  }
`;
