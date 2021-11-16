import { FiLoader } from 'react-icons/fi'
import styled, { keyframes } from 'styled-components'
import { screenSize } from '../../styles/theme'

export const Effect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${p => p.theme.colors.main};
  height: 64px;
  width: 100%;
  z-index: -1;
`

export const Button = styled.button`
  border: none;
  background-color: ${p => p.theme.colors.main};
  color: #ffffff;
  border-radius: 4px;
  padding: 0 20px;
  height: 50px;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    opacity: 0.9;
  }
`

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid;
  padding: 20px 15px;
  border-radius: 4px;
  width: 80%;
  align-self: center;
  background-color: ${p => p.theme.colors.default};

  @media screen and (max-width: ${screenSize.medium}) {
    flex-direction: column;
  }
`

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const LoadingIcon = styled(FiLoader)`
  animation: ${rotateAnimation} 3s;
`
