import React, { useRef } from 'react'
import { Subtract, Add } from 'grommet-icons'
import { Select, Box, Button, SelectProps, FormField, Form } from 'grommet'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import { useSearch } from '../../store/search/hooks'
import { SearchDomain } from '../../domain/search'

const Passenger = styled(Box)`
  padding: 10px 5px;
  font-size: 18px;
  border-bottom: 1px solid ${(props) => props.theme.colors.blueLight};
`
const PassengerText = styled.p`
  display: inline-block;
  font-weight: 700;
  margin: 0 5px;
`

const PassengerAgeText = styled.p``

const PassengerButtons = styled.div`
  margin-left: 20px;
`
const PassengerButton = styled(Button)`
  display: inline-flex;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  background-color: ${(props) => props.theme.colors.blueLight};
  justify-content: center;
  align-items: center;
  margin: 5px;
  transition: background-color 200ms;

  &:hover {
    background-color: ${(props) => props.theme.colors.yellow};
  }

  svg {
    width: 14px;
    height: 14px;
  }
`
const PassengerCounter = styled(Box)``

const PassengerAge = styled(Box)`
  padding-left: 10px;
`

const PassengerAgeSelect = styled(Select)`
  width: 60px;
`

const PassengersCount = styled.div`
  margin-top: 8px;
`
export const PassengerSelect = () => {
  const { getPassengers, setPassenger, getPassengersCount } = useSearch()
  const selectRef = useRef<React.Component<SelectProps, any, any>>(null)

  const incrementPassenger = (id: SearchDomain.PassengerKeys) => {
    setPassenger({ passenger: id, value: ++getPassengers[id] })
  }

  const decrementPassenger = (id: SearchDomain.PassengerKeys) => {
    const value =
      getPassengers[id] > 0 ? --getPassengers[id] : getPassengers[id]
    setPassenger({ passenger: id, value })
  }

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
    console.log(actualValues)

    for (let i = 0; i < itemsToRender; i++) {
      renderedItems.push(
        <PassengerAge direction="row" align="center" justify="between">
          <PassengerAgeText>
            {ageItem!.name} {`${i + 1}`}
          </PassengerAgeText>
          <PassengerAgeSelect
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
            placeholder={<FormattedMessage id="age" />}
          ></PassengerAgeSelect>
        </PassengerAge>
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

    return (
      <Passenger direction="column" wrap={true}>
        <PassengerCounter direction="row" align="center" justify="between">
          {name}
          <PassengerButtons>
            <PassengerButton
              onFocus={(event) => event.stopPropagation()}
              disabled={value <= 0 || (getPassengersCount === 1 && value === 1)}
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                decrementPassenger(id)
                selectRef.current!.focus()
              }}
            >
              <Subtract color="#fff" />
            </PassengerButton>
            <PassengerText>{value}</PassengerText>
            <PassengerButton
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
            </PassengerButton>
          </PassengerButtons>
        </PassengerCounter>
        {renderAgeInput(id)}
      </Passenger>
    )
  }

  const passengersList: Array<{
    name: React.ReactNode
    id: SearchDomain.PassengerKeys
    child?: SearchDomain.PassengerAgeKeys
  }> = [
    { name: <FormattedMessage id="adults" />, id: SearchDomain.ADULT },
    {
      name: <FormattedMessage id="children" />,
      id: SearchDomain.CHILD,
      child: SearchDomain.CHILD_AGES,
    },
    {
      name: <FormattedMessage id="seniors" />,
      id: SearchDomain.SENIOR,
      child: SearchDomain.SENIOR_AGES,
    },
  ]

  const agesList = [
    {
      parent: SearchDomain.SENIOR,
      name: <FormattedMessage id="senior" />,
      id: SearchDomain.SENIOR_AGES,
      options: ['60', '61', '62', '63', '64', '65', '65+'],
    },
    {
      parent: SearchDomain.CHILD,
      name: <FormattedMessage id="child" />,
      id: SearchDomain.CHILD_AGES,
      options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    },
  ]

  const renderValue = () => {
    return (
      <PassengersCount>
        <FormattedMessage
          id="passengers_count"
          values={{ count: getPassengersCount }}
        />
      </PassengersCount>
    )
  }

  return (
    <FormField label={<FormattedMessage id="passengers" />}>
      <Select
        dropProps={{ stretch: false }}
        focusIndicator={false}
        ref={selectRef}
        closeOnChange={false}
        options={passengersList}
        value={renderValue()}
      >
        {renderOption}
      </Select>
    </FormField>
  )
}
