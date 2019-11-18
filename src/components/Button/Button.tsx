import React from 'react';
import styled from 'styled-components';

interface Props {
  onClickAction: (payload: string) => void;
  children: React.ReactNode;
}

const StyledButton = styled.button`
  background-color: ${props => props.theme.busbud.button.backgroundColor};
  border-color: ${props => props.theme.busbud.button.backgroundColor};
  border-radius: ${props => props.theme.busbud.button.borderRadius};
  box-shadow: ${props => props.theme.busbud.button.boxShadow};
  color: ${props => props.theme.busbud.button.color};
  font-size: ${props => props.theme.busbud.button.fontSize};
  font-weight: ${props => props.theme.busbud.button.fontWeight};
  padding: ${props => props.theme.busbud.button.padding};

  &:hover {
    background-color: ${props =>
      props.theme.busbud.button.backgroundColorHover};
  }
`;

export default function Button({ onClickAction, children }: Props) {
  return (
    <StyledButton type="button" onClick={() => onClickAction('todo')}>
      {children}
    </StyledButton>
  );
}
