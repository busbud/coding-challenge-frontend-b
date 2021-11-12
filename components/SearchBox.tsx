import {
  FiArrowUpRight,
  FiArrowDownRight,
  FiCalendar,
  FiUser,
} from 'react-icons/fi'
import styled from 'styled-components'
import { useDestination } from '../hooks/useDestination'
import FilterOption from './FilterOption'

const Button = styled.button`
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

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid;
  padding: 20px 15px;
  border-radius: 4px;
  width: 80%;
`

const SearchBox = () => {
  const { fetchDepartures, isFetching } = useDestination()

  const onClickSearch = () => {
    fetchDepartures()
  }

  return (
    <Box>
      <FilterOption icon={FiArrowUpRight}>Quebéc</FilterOption>
      <FilterOption icon={FiArrowDownRight}>Montreal</FilterOption>
      <FilterOption icon={FiCalendar}>2020-11-21</FilterOption>
      <FilterOption icon={FiUser}>1 Adult</FilterOption>
      <Button onClick={onClickSearch}>
        {isFetching ? 'Searching....' : 'Search'}
      </Button>
    </Box>
  )
}

export default SearchBox
