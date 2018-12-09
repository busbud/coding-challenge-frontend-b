import styled from 'styled-components'

export const StyledCity = styled.span`
  color: ${props => props.primary ? '#1f242b' : 'rgba(32, 37, 43, .35)'};
  margin-left: .57rem;
`

export const StyledCityName = styled.span`
  font-size: 16px;
  font-weight: 500;

  &::after {
    content: " - ";
  }
`

export const StyledDeparture = styled.div`
  background-color: #ffffff;
  border-radius: .3rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .24);
  display: flex;
  flex-direction: column;
  margin: 1.42rem 0;
  position: relative;
`

export const StyledDepartureContent = styled.div`
  flex: 1 1 auto;
  padding: 1.14rem;
`

export const StyledDepartureSchedule = styled.div`
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: .57rem;
`

export const StyledOperator = styled.div`
  > img {
    height: 25px;
    width: auto;
  }
`

export const StyledPrice = styled.div`
  color: #f19020;
  font-size: 1.71rem;
  font-weight: 700;
  line-height: 1.71rem;
  text-align: right;
`

export const StyledTime = styled.strong`
  color: ${props => props.primary ? '#127ccb' : 'rgba(32, 37, 43, .35)'};
  display: inline-block;
  font-size: 16px;
  font-weight: 700;
  width: 5em;
`