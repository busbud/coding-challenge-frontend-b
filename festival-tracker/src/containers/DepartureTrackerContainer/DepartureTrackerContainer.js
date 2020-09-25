import React, { useState } from 'react'
import Dropdown from 'react-dropdown'
import axios from '../../axios-instance'
import { Button, Typography, DatePicker, InputNumber, Spin } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import classes from './DepartureTrackerContainer.module.sass'

const geohashMtl = 'f25dvk'
const geohashNY = 'dr5reg'
const geohashQC = 'f2m673'

const optionsCities = [
  { value: 'f25dvk', label: 'Montreal' },
  { value: 'dr5reg', label: 'New York' },
  { value: 'f2m673', label: 'Quebec' }
]

const optionsCurrency = [
  { value: 'USD', label: 'US Dollard ($)' },
  { value: 'CAD', label: 'Canadian Dollard ($)' }
]

const optionsCountry = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' }
]

const { Title } = Typography

const DepartureTracker = () => {
  const [loading, changeLoading] = useState(false)
  const [departures, changeDepartures] = useState([])
  const [origin, changeOrigin] = useState(geohashMtl)
  const [destination, changeDestination] = useState(geohashNY)
  const [adult, changeAdult] = useState(1)
  const [child, changeChild] = useState(0)
  const [senior, changeSenior] = useState(0)
  const [currency, changeCurrency] = useState('CAD')
  const [country, changeCountry] = useState('CA')
  const now = new Date()
  const currentDate = now.toISOString().substring(0, 10)
  const [date, changeDate] = useState(currentDate)

  const launchSearch = () => {
    // ISO 3166-1 alpha-2 language code
    const lang = 'CA'
    // ISO 4217 currency code
    const currency = 'USD'
    changeLoading(true)
    axios.get(`/x-departures/${origin}/${destination}/${date}`, {
      params: {
        adult,
        child,
        senior,
        lang,
        currency
      }
    })
      .then(res => {
        changeLoading(false)
        changeDepartures(res.data)
        console.log(res)
      })
      .catch(err => {
        changeLoading(false)
        console.log(err)
      })
  }

  let departuresBlocks = <Spin size='large' />
  if (!loading) {
    departuresBlocks = <div>{JSON.stringify(departures)}</div>
  }

  return (
    <>

      <Title level={2}>Departure Tracker</Title>
      <div className={classes.Container}>
        <div className={classes.Form}>
          <Title level={4}>Date</Title>
          <DatePicker onChange={(value) => {
            changeDate(value.toISOString().substring(0, 10))
          }}
          />
          <Title level={4}>Origin</Title>
          <Dropdown options={optionsCities} onChange={(object) => changeOrigin(object.value)} value={origin} placeholder='Select an origin' />
          <Title level={4}>Destination</Title>
          <Dropdown options={optionsCities} onChange={(object) => changeDestination(object.value)} value={destination} placeholder='Select a destination' />
          <Title level={4}>Adult</Title>
          <InputNumber min={0} max={99} defaultValue={adult} onChange={(value) => changeAdult(value)} />
          <Title level={4}>Child</Title>
          <InputNumber min={0} max={99} defaultValue={child} onChange={(value) => changeChild(value)} />
          <Title level={4}>Senior (65+)</Title>
          <InputNumber min={0} max={99} defaultValue={senior} onChange={(value) => changeSenior(value)} />
          <Title level={4}>Country</Title>
          <Dropdown options={optionsCountry} onChange={(object) => changeCountry(object.value)} value={country} placeholder='Select a country' />
          <Title level={4}>Currency</Title>
          <Dropdown options={optionsCurrency} onChange={(object) => changeCurrency(object.value)} value={currency} placeholder='Select a currency' />
          <br /><br />
          <Button onClick={() => launchSearch()} type='primary' icon={<SearchOutlined />}>
            Search
          </Button>
          <br /><br />
        </div>
        <div className={classes.Departures}>
          {departuresBlocks}
        </div>
      </div>
    </>
  )
}

export default DepartureTracker
