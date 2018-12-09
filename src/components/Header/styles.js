import styled from 'styled-components'

export const StyledContent = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 620px) {
    flex-direction: row;
  }
`

export const StyledDate = styled.div`
  color: #ffffff;
  font-size: 1.85rem;
  font-weight: 700;
  padding-top: 4px;

  @media (min-width: 620px) {
    padding-top: 0;
  }
`

export const StyledHeader = styled.header`
  background-color: #127ccb;
  padding: 1.42rem 1.14rem;
  position: relative;
  z-index: 10;
`

export const StyledTitle = styled.div`
  align-items: center;
  color: #ffffff;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.85rem;
  font-weight: 700;

  svg {
    margin-left: .57rem;
    margin-right: .57rem;
  }
`
