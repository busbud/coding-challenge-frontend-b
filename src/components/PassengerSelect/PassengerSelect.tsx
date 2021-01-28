import React, { useRef } from 'react'
import { Subtract, Add } from 'grommet-icons'
import { Select, Box, FormField } from 'grommet'
import { IntlText } from '../Intl/IntlText'

import { useSearch } from '../../store/search/hooks'
import { SearchDomain } from '../../domain/search'

import * as Styled from './styles'

const passengersList: Array<{
  name: React.ReactNode
  id: SearchDomain.PassengerKeys
  child?: SearchDomain.PassengerAgeKeys
}> = [
  { name: <IntlText id="adults" />, id: SearchDomain.ADULT },
  {
    name: <IntlText id="children" />,
    id: SearchDomain.CHILD,
    child: SearchDomain.CHILD_AGES,
  },
  {
    name: <IntlText id="seniors" />,
    id: SearchDomain.SENIOR,
    child: SearchDomain.SENIOR_AGES,
  },
]

const agesList = [
  {
    parent: SearchDomain.SENIOR,
    name: <IntlText id="senior" />,
    id: SearchDomain.SENIOR_AGES,
    options: ['60', '61', '62', '63', '64', '65', '65+'],
  },
  {
    parent: SearchDomain.CHILD,
    name: <IntlText id="child" />,
    id: SearchDomain.CHILD_AGES,
    options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  },
]

export const PassengerSelect = () => {
  const {
    getPassengers,
    setPassenger,
    getPassengersCount,
    incrementPassenger,
    decrementPassenger,
  } = useSearch()
  const selectRef = useRef<HTMLInputElement>(null)

  const renderAgeInput = (id: SearchDomain.PassengerKeys) => {
    const item = passengersList.filter((item) => item.id === id)[0]
    if (!item.child) return

    const ageItem = agesList.find((item) => item.parent === id)
    const itemsToRender = getPassengers[item.id as SearchDomain.PassengerKeys]
    const renderedItems = []
    const actualValues = [
      ...getPassengers[ageItem!.id as SearchDomain.PassengerAgeKeys].slice(
        0,
        itemsToRender
      ),
    ]

    for (let i = 0; i < itemsToRender; i++) {
      renderedItems.push(
        <Styled.PassengerAge direction="row" align="center" justify="between">
          <Styled.PassengerAgeText
            data-testid={`AGE.${ageItem!.id.toUpperCase()}.${i}`}
          >
            {ageItem!.name} {`${i + 1}`}
          </Styled.PassengerAgeText>
          <Styled.PassengerAgeSelect
            size="small"
            value={actualValues[i] ? actualValues[i].toString() : undefined}
            options={ageItem!.options as string[]}
            id={`${ageItem!.id}_${i}`}
            onChange={({ option }) => {
              actualValues[i] = option
              setPassenger({
                passenger: ageItem?.id as SearchDomain.PassengerAgeKeys,
                value: actualValues,
              })
            }}
            placeholder={<IntlText id="age" />}
          ></Styled.PassengerAgeSelect>
        </Styled.PassengerAge>
      )
    }
    return <Box>{renderedItems}</Box>
  }

  const renderOption = ({
    name,
    id,
  }: {
    name: string
    id: SearchDomain.PassengerKeys
  }) => {
    const value = getPassengers[id]
    const isDecrementDisabled =
      value <= 0 || (getPassengersCount === 1 && value === 1)

    return (
      <Styled.Passenger direction="column" wrap={true}>
        <Styled.PassengerCounter
          direction="row"
          align="center"
          justify="between"
        >
          {name}
          <Styled.PassengerButtons>
            <Styled.PassengerButton
              data-testid="DECREMENT"
              onFocus={(event) => event.stopPropagation()}
              disabled={isDecrementDisabled}
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                decrementPassenger(id)
                selectRef.current!.focus()
              }}
            >
              <Subtract color="#fff" />
            </Styled.PassengerButton>

            <Styled.PassengerText>{value}</Styled.PassengerText>

            <Styled.PassengerButton
              data-testid="INCREMENT"
              disabled={SearchDomain.hasMaxPassengers(getPassengersCount)}
              onFocus={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                incrementPassenger(id)
                selectRef.current!.focus()
              }}
            >
              <Add color="#fff" />
            </Styled.PassengerButton>
          </Styled.PassengerButtons>
        </Styled.PassengerCounter>
        {renderAgeInput(id)}
      </Styled.Passenger>
    )
  }

  const renderValue = () => {
    return (
      <Styled.PassengersCount>
        <IntlText
          id="passengers_count"
          values={{ count: getPassengersCount }}
        />
      </Styled.PassengersCount>
    )
  }

  return (
    <FormField
      label={<IntlText id="passengers" />}
      data-testid="PASSENGER.TEXT"
    >
      <Select
        dropProps={{
          //@ts-ignore
          'data-testid': 'PASSENGER.DROP',
          stretch: false,
        }}
        focusIndicator={false}
        ref={selectRef as any}
        closeOnChange={false}
        options={passengersList}
        value={renderValue()}
      >
        {renderOption}
      </Select>
    </FormField>
  )
}
