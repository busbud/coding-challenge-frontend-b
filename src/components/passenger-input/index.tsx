// Packages
import React, { useEffect, useRef, useState } from 'react'
import { useToggle } from 'react-use'
import KeyHandler from 'react-key-handler'
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
import useClickAway from 'hooks/use-click-away'

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

function PassagerInput(props: Props) {
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

  const ref = useClickAway(() => {
    toggleOpen(false)
  })

  const totalPassagers = adultTotal + childTotal + srTotal
  const seniorRangeAge = ageOptionFactory(60, 80)
  const childRangeAge = ageOptionFactory(0, 18)

  const handleClick = async () => await toggleOpen(!open)

  const handleChangeAge = ({ target }) => {
    const {
      name,
      value: { label, value: paxCount }
    } = target
    const [fieldType, id] = name.split('_')

    if (typeof paxCount === 'number') ages[fieldType][id] = { label, paxCount }
    console.log({ ages })
  }

  useEffect(() => {
    setMaxHeight(open ? `${contentRef?.current?.scrollHeight}px` : undefined)
  }, [contentRef, open, childAgeField, seniorAgeField])

  useEffect(() => {
    onChange({
      adult: adultTotal,
      child: childTotal,
      senior: srTotal,
      childAges: ages.child,
      seniorAges: ages.senior
    })
  }, [adultTotal, childTotal, srTotal, ages, onChange])

  return (
    <S.Wrapper ref={ref} borderless={borderless}>
      <KeyHandler
        keyEventName="keydown"
        keyValue="Escape"
        onKeyHandle={handleClick}
      />
      <S.Placeholder maxWidth={maxWidth} onClick={handleClick}>
        <div>
          <IoPersonOutline />
          {pluralize(totalPassagers, 'Passager')}
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
            <S.Text>Adult</S.Text>
            <Button type="button" skyBlue circle onClick={adultDecrement}>
              <IoRemoveOutline />
            </Button>
            <S.Total>{adultTotal}</S.Total>
            <Button type="button" skyBlue circle onClick={adultIncrement}>
              <IoAddOutline />
            </Button>
          </S.Box>
          <S.Box display="flex" alignItems="center">
            <S.Text>Children</S.Text>
            <Button
              type="button"
              skyBlue
              circle
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
              'Child',
              childRangeAge,
              ages.child,
              handleChangeAge
            )}
          </div>
          <S.Box display="flex" alignItems="center">
            <S.Text>Senior</S.Text>
            <Button
              type="button"
              skyBlue
              circle
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
              'Senior',
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

export default PassagerInput
