import styled from 'styled-components'
import { screenSize } from '../../styles/theme'

export const CardContainer = styled.div`
  display: flex;
  border-radius: 4px;
  padding: 16px;
  width: 80%;
  height: 80px;
  border: 1px solid ${p => p.theme.colors.main};
  align-self: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin: 8px;

  cursor: pointer;
  transition: box-shadow 300ms, transform 300ms;

  &:hover {
    box-shadow: 5px 5px 10px #ddd;
    transform: scale(1.01);
  }
`
export const Title = styled.span`
  font-size: 1.2rem;
  color: #777;
  margin: 0 10px;
`
export const Value = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`
export const Register = styled.div`
  display: flex;
  flex-direction: row;
`
export const Row = styled.div`
  @media screen and (max-width: ${screenSize.small}) {
    margin-bottom: 5px;
  }
`
export const Price = styled.p`
  color: ${p => p.theme.colors.main};
  font-weight: bold;
  font-size: 1.8rem;
  ::before {
    content: '$ ';
    color: #000;
  }
`
export const V = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: ${screenSize.medium}) {
    flex-direction: column;
  }
`
