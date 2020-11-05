import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  height: 48px;
  margin: 0;
  padding: 0;
  margin-left: 23px;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.highlight};
  outline: none;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  line-height: 48px;
  position: relative;
  .three-dots, .chevron {
    fill: ${({ theme }) => theme.colors.highlight};
    align-self: center;
  };
  .chevron {
    margin-right: 8px;
    ${({ showStops }) => showStops && css`
      transform: rotate(180deg);
    `}
  }
  .three-dots {
    position: absolute;
    left: -18px;
  }
  ${({ showStops }) => showStops && css`
    &::before{
      content: '';
      width: 3px;
      height: 100%;
      position: absolute;
      left: -18px;
      background: ${({ theme }) => theme.colors.highlight};
    }
  `}
`;

export default StyledButton;
