import { FC, useState } from 'react'
import { IconType } from 'react-icons'
import { colors, fontSize } from '../../styles/theme'
import { FilterOptionBox, FilterValue } from './styles'

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
