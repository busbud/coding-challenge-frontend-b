// Packages
import React, { useEffect, useRef, useState } from 'react'
import { useToggle } from 'react-use'
import KeyHandler from 'react-key-handler'
import { useTranslation } from 'react-i18next'
import {
  IoChevronDown,
  IoPersonOutline,
  IoAddOutline,
  IoRemoveOutline
} from 'react-icons/io5'

// Components
import Button from 'components/button'

// Hooks
import useCounter from 'hooks/use-counter'

// Helpers
import pluralize from 'helpers/pluralize'
import ageFieldFactory from 'helpers/age-field-factory'
import ageOptionFactory from 'helpers/age-option-factory'

// Styles
import * as L from 'layout'
import * as S from './styles'

type Props = {
  maxWidth?: string
  borderless?: boolean
  onChange?(event: {
    adult: number
    child?: number
    senior?: number
    childAges?: Record<string | number, string | number>[]
    seniorAges?: Record<string | number, string | number>[]
  }): void
}

function PassengerInput(props: Props) {
  const { t } = useTranslation()
  const { maxWidth, borderless, onChange } = props
  const [open, toggleOpen] = useToggle(false)
  const [maxHeight, setMaxHeight] = useState<string>()
  const contentRef = useRef<HTMLDivElement>(null)
  const [childAgeField, setChildAgeField] = useState([])
  const [seniorAgeField, setSeniorAgeField] = useState([])
  const [ages] = useState({ child: [], senior: [] })

  const {
    increment: adultIncrement,
    decrement: adultDecrement,
    count: adultTotal = 1
  } = useCounter({
    initialCount: 1
  })

  const {
    increment: childIncrement,
    decrement: childDecrement,
    count: childTotal
  } = useCounter()

  const {
    increment: srIncrement,
    decrement: srDecrement,
    count: srTotal
  } = useCounter()

  const totalPassengers = adultTotal + childTotal + srTotal
  const seniorRangeAge = ageOptionFactory(60, 80)
  const childRangeAge = ageOptionFactory(0, 18)
  const isDisabled = adultTotal === 5

  const handleClick = async () => await toggleOpen(!open)

  const handleChangeAge = ({ target }) => {
    const {
      name,
      value: { label, value: paxCount }
    } = target
    const [fieldType, id] = name.split('_')

    if (typeof paxCount === 'number') ages[fieldType][id] = { label, paxCount }
  }

  useEffect(() => {
    setMaxHeight(
      open ? `calc(${contentRef?.current?.scrollHeight}px + 5rem)` : undefined
    )
  }, [contentRef, open, childAgeField, seniorAgeField])

  useEffect(() => {
    onChange({
      adult: adultTotal,
      child: childTotal,
      senior: srTotal,
      childAges: ages.child,
      seniorAges: ages.senior
    })
  }, [adultTotal, childTotal, srTotal, ages])

  return (
    <S.Wrapper borderless={borderless}>
      <KeyHandler
        keyEventName="keydown"
        keyValue="Escape"
        onKeyHandle={handleClick}
      />
      <S.Placeholder maxWidth={maxWidth} onClick={handleClick}>
        <div>
          <IoPersonOutline />
          {pluralize(totalPassengers, t('passenger'))}
        </div>
        <L.TurnIcon turn={open}>
          <IoChevronDown />
        </L.TurnIcon>
      </S.Placeholder>
      {open && (
        <S.ContentWrapper
          ref={contentRef}
          maxHeight={maxHeight}
          maxWidth={maxWidth}
        >
          <S.Box display="flex" alignItems="center">
            <S.Text>{t('adult')}</S.Text>
            <Button
              type="button"
              skyBlue
              circle
              onClick={adultDecrement}
              disabled={adultTotal === 1}
            >
              <IoRemoveOutline />
            </Button>
            <S.Total>{adultTotal}</S.Total>
            <Button
              type="button"
              skyBlue
              circle
              onClick={adultIncrement}
              disabled={isDisabled}
            >
              <IoAddOutline />
            </Button>
          </S.Box>
          <S.Box display="flex" alignItems="center">
            <S.Text>{t('child')}</S.Text>
            <Button
              type="button"
              skyBlue
              circle
              disabled={childTotal === 0}
              onClick={() => {
                childDecrement()
                ages.child.splice(childAgeField.length - 1, 1)
                childAgeField.splice(childAgeField.length - 1, 1)
              }}
            >
              <IoRemoveOutline />
            </Button>
            <S.Total>{childTotal}</S.Total>
            <Button
              type="button"
              skyBlue
              circle
              disabled={isDisabled}
              onClick={(): void => {
                childIncrement()
                setChildAgeField([...childAgeField, ''])
              }}
            >
              <IoAddOutline />
            </Button>
          </S.Box>
          <div>
            {ageFieldFactory(
              childAgeField,
              'child',
              t('child'),
              childRangeAge,
              ages.child,
              handleChangeAge
            )}
          </div>
          <S.Box display="flex" alignItems="center">
            <S.Text>{t('senior')}</S.Text>
            <Button
              type="button"
              skyBlue
              circle
              disabled={srTotal === 0}
              onClick={() => {
                srDecrement()
                ages.senior.splice(childAgeField.length - 1, 1)
                seniorAgeField.splice(seniorAgeField.length - 1, 1)
              }}
            >
              <IoRemoveOutline />
            </Button>
            <S.Total>{srTotal}</S.Total>
            <Button
              type="button"
              skyBlue
              circle
              disabled={isDisabled}
              onClick={(): void => {
                srIncrement()
                setSeniorAgeField([...seniorAgeField, ''])
              }}
            >
              <IoAddOutline />
            </Button>
          </S.Box>
          <div>
            {ageFieldFactory(
              seniorAgeField,
              'senior',
              t('senior'),
              seniorRangeAge,
              ages.senior,
              handleChangeAge
            )}
          </div>
        </S.ContentWrapper>
      )}
    </S.Wrapper>
  )
}

export default PassengerInput
