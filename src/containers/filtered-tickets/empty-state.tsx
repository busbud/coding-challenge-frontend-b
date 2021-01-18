// Packages
import React from 'react'

// Components
import Chip from 'components/chip'

// Styles
import * as S from './styles'

function EmptyState({ isLoading }) {
  return (
    <>
      {!isLoading && (
        <S.ContentEmptyState>
          <S.Title>Millions of bus routes, one simple search</S.Title>
          <S.EmptyState>
            <Chip
              title="Why use Busbud?"
              subTitle="Book bus travel; anytime, anywhere."
            />
            <Chip
              title="Your trip, your priorities"
              subTitle="On a budget? Tight schedule? Book tickets that fit your needs."
            />
            <Chip
              title="Global coverage"
              subTitle="Save time by comparing all your bus travel options in one place."
            />
            <Chip
              title="24/7 support"
              subTitle="Our world class team of bus experts is always here to help."
            />
          </S.EmptyState>
        </S.ContentEmptyState>
      )}
    </>
  )
}

export default EmptyState
