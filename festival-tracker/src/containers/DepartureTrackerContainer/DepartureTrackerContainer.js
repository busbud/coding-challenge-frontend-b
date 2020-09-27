import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Dropdown from 'react-dropdown'
import moment from 'moment'
import axios from '../../axios-instance'
import { Button, DatePicker, InputNumber } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import Departure from '../../components/Departure/Departure'
import Loading from '../../components/Loading/Loading'

import classes from './DepartureTrackerContainer.module.sass'

const geohashMtl = 'f25dvk'
// const geohashNY = 'dr5reg'
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

const DepartureTracker = () => {
  const { t } = useTranslation()
  const [loading, changeLoading] = useState(false)
  const [departures, changeDepartures] = useState([])
  const [operators, changeOperators] = useState([])
  const [locations, changeLocations] = useState([])
  const [origin, changeOrigin] = useState(geohashQC)
  const [destination, changeDestination] = useState(geohashMtl)
  const [adult, changeAdult] = useState(1)
  const [child, changeChild] = useState(0)
  const [senior, changeSenior] = useState(0)
  const [pollIndex, changePollIndex] = useState(0)
  const [completeStatus, changeCompleteStatus] = useState(true)
  // ISO 4217 currency code
  const [currency, changeCurrency] = useState('CAD')
  // ISO 3166-1 alpha-2 language code
  const [country, changeCountry] = useState('CA')
  const now = new Date()
  const currentDate = now.toISOString().substring(0, 10)
  const [date, changeDate] = useState(currentDate)

  // /**
  //  * Poll search will change when next page of departures is requested
  //  */
  // useEffect(() => {
  //   pollSearch()
  // }, [pollIndex])

  /**
   * Launch a new search of bus departures with current settings
   */
  const launchSearch = () => {
    changeLoading(true)
    changeCompleteStatus(true)
    axios.get(`/x-departures/${origin}/${destination}/${date}`, {
      params: {
        adult,
        child,
        child_ages: `${'10,'.repeat(child).slice(0, -1)}`,
        senior,
        senior_ages: `${'75,'.repeat(senior).slice(0, -1)}`,
        lang: country,
        currency
      }
    })
      .then(res => {
        pollSearch(0)
      })
      .catch(err => {
        changeDepartures([])
        changeLoading(false)
        console.log(err)
      })
  }

  /**
   * Poll the next 10 result from the current search (based on pollIndex)
   * This function is automatically triggered when pollIndex change
   */
  const pollSearch = (newPollIndex) => {
    changePollIndex(newPollIndex)
    changeLoading(true)
    axios.get(`/x-departures/${origin}/${destination}/${date}/poll`, {
      params: {
        adult,
        child,
        child_ages: `${'10,'.repeat(child).slice(0, -1)}`,
        senior,
        senior_ages: `${'75,'.repeat(senior).slice(0, -1)}`,
        lang: country,
        currency,
        index: newPollIndex
      }
    })
      .then(res => {
        changeDepartures(res.data.departures)
        changeOperators(res.data.operators)
        changeLocations(res.data.locations)
        changeCompleteStatus(res.data.complete)
        if (!res.data.complete) {
          changeLoading(true)
          setTimeout(() => {
            pollSearch(newPollIndex)
          }, 2000)
        } else {
          changeLoading(false)
        }
      })
      .catch(err => {
        changeLoading(false)
        changeDepartures([])
        console.log(err)
      })
  }

  let departuresBlocks = <Loading />
  // If the departures are found, we render them in blocks
  if (!loading) {
    let departuresBlocksRendered = <div>{t('No departures found')}</div>
    if (departures.length) {
      departuresBlocksRendered = departures.map((departure, i) => {
        return <Departure key={`departure-${i}`} departure={departure} operators={operators} locations={locations} />
      })
    }
    departuresBlocks = (
      <div className={classes.DepartureBlocks}>
        {departuresBlocksRendered}
      </div>
    )
  }

  return (
    <>
      <div className={classes.Instructions}>{t('Find the best bus ticket to your destination !')}</div>
      <div className={classes.Container}>
        <div className={classes.Form}>
          <div className={classes.FormGroup}>
            <div className={classes.FormItem}>
              <div>{t('Date')}</div>
              <DatePicker
                defaultValue={moment(date)} onChange={(value) => {
                  changeDate(value?.toISOString().substring(0, 10))
                }}
              />
            </div>
          </div>
          <div className={classes.FormGroup}>
            <div className={classes.FormItem}>
              <div>{t('Origin')}</div>
              <Dropdown options={optionsCities} onChange={(object) => changeOrigin(object.value)} value={origin} placeholder={t('Select an origin')} />
            </div>
            <div className={classes.FormItem}>
              <div>{t('Destination')}</div>
              <Dropdown options={optionsCities} onChange={(object) => changeDestination(object.value)} value={destination} placeholder={t('Select a destination')} />
            </div>
          </div>
          <div className={classes.FormGroup}>
            <div className={classes.FormItem}>
              <div>{t('Adult')}</div>
              <InputNumber min={0} max={99} defaultValue={adult} onChange={(value) => changeAdult(value)} />
            </div>
            <div className={classes.FormItem}>
              <div>{t('Child')}</div>
              <InputNumber min={0} max={99} defaultValue={child} onChange={(value) => changeChild(value)} />
            </div>
            <div className={classes.FormItem}>
              <div>{t('Senior (65+)')}</div>
              <InputNumber min={0} max={99} defaultValue={senior} onChange={(value) => changeSenior(value)} />
            </div>
          </div>
          <div className={classes.FormGroup}>
            <div className={classes.FormItem}>
              <div>{t('Country')}</div>
              <Dropdown options={optionsCountry} onChange={(object) => changeCountry(object.value)} value={country} placeholder={t('Select a country')} />
            </div>
            <div className={classes.FormItem}>
              <div>{t('Currency')}</div>
              <Dropdown options={optionsCurrency} onChange={(object) => changeCurrency(object.value)} value={currency} placeholder={t('Select a currency')} />
            </div>
          </div>
          <Button className={classes.SearchButton} onClick={() => launchSearch()} type='primary' icon={<SearchOutlined />}>
            {t('Search')}
          </Button>
        </div>
        <div className={classes.Departures}>
          {t('Results')} {pollIndex + 1} - {pollIndex + 10}
          <div className={classes.NavigationButtons}>
            <Button className={classes.NavigationButton} disabled={pollIndex === 0} onClick={() => pollSearch(pollIndex - 10 > 0 ? pollIndex - 10 : 0)} type='primary'>
              {t('Previous')}
            </Button>
            <Button
              className={classes.NavigationButton}
              // Should be disabled by default but for testing purpose it is enabled
              // disabled={completeStatus}
              onClick={() => pollSearch(pollIndex + 10)}
              type='primary'
            >
              {t('Next')}
            </Button>
          </div>
          {departuresBlocks}
        </div>
      </div>
    </>
  )
}

export default DepartureTracker
