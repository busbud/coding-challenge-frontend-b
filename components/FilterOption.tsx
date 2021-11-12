import { FC, useState } from 'react'
import { IconType } from 'react-icons'
import styled from 'styled-components'
import { colors, fontSize } from '../styles/theme'

const FilterOptionBox = styled.div`
  border: 2px solid;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  min-width: 125px;
`

const FilterValue = styled.span`
  font-size: ${p => p.theme.fontSize.md}px;
`

type Props = {
  icon: IconType
}

const FilterOption: FC<Props> = ({ children, icon: Icon }) => {
  const [hoverColor, setHoverColor] = useState<colors>(colors.default)

  const onMouseEnter = () => {
    setHoverColor(colors.main)
  }

  const onMouseLeave = () => {
    setHoverColor(colors.default)
  }

  return (
    <FilterOptionBox onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
      <FilterValue>{children}</FilterValue>
      <Icon color={hoverColor} size={fontSize.lg} />
    </FilterOptionBox>
  )
}

export default FilterOption
