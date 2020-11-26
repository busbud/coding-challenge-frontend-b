import { React, styled } from './dependencies';

const Container = styled.div<{ visible: boolean }>`
  top: 50%;
  left: 50%;
  border-radius: 0.1rem;
  display: block;
  position: absolute;
  padding: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  transform: translate(-50%, -50%);
  transition: ${({ visible }) =>
    visible
      ? '300ms ease, 300ms 0ms visibility'
      : '300ms ease, 0ms 300ms visibility'};
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  background-color: rgba(255, 255, 255, 0.8);
`;

export const Loading: React.FC<{ visible: boolean }> = ({ visible }) => {
  return <Container visible={visible}>Loading...</Container>;
};
