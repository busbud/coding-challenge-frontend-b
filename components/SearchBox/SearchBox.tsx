import { FC } from 'react'
import {
  FiArrowUpRight,
  FiArrowDownRight,
  FiCalendar,
  FiUser,
} from 'react-icons/fi'
import styled, { keyframes } from 'styled-components'
import { useDestination } from '../../hooks/useDestination'
import { FetchStatus } from '../../interfaces'
import { fontSize } from '../../styles/theme'
import FilterOption from '../FilterOption/FilterOption'
import { Effect, Box, Button, LoadingIcon } from './styles'

const SearchBox: FC = () => {
  const { getDepartures, fetchingStatus } = useDestination()

  const onClickSearch = () => {
    getDepartures()
  }

  return (
    <>
      <Effect />
      <Box>
        <FilterOption icon={FiArrowUpRight}>Quebéc</FilterOption>
        <FilterOption icon={FiArrowDownRight}>Montreal</FilterOption>
        <FilterOption icon={FiCalendar}>2020-11-21</FilterOption>
        <FilterOption icon={FiUser}>1 Adult</FilterOption>
        <Button onClick={onClickSearch}>
          {fetchingStatus === FetchStatus.loading ? (
            <LoadingIcon fontSize={fontSize.md} />
          ) : (
            'Search'
          )}
        </Button>
      </Box>
    </>
  )
}

export default SearchBox
