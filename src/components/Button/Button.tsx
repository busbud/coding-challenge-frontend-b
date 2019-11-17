import React from 'react';
import styled from 'styled-components';

interface Props {
  onClickAction: (payload: string) => void;
  children: React.ReactNode;
}

const StyledButton = styled.button`
  background-color: #161616;
  border-radius: 5px;
  color: white;
  font-size: 0.8rem;
  padding: 10px;
`;

export default function Button({ onClickAction, children }: Props) {
  return (
    <StyledButton type="button" onClick={() => onClickAction('todo')}>
      {children}
    </StyledButton>
  );
}
