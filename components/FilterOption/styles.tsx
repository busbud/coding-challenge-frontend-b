import styled from 'styled-components'

export const FilterOptionBox = styled.div`
  border: 2px solid;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  min-width: 125px;
  background-color: #fff;
`

export const FilterValue = styled.span`
  font-size: ${p => p.theme.fontSize.md}px;
`
