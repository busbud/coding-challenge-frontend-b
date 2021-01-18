// Packages
import React, { useState, useEffect } from 'react'
import { formatISO } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { MdAutorenew } from 'react-icons/md'
import { IoLocationOutline, IoRadioButtonOffOutline } from 'react-icons/io5'
import { FiSearch } from 'react-icons/fi'

// Components
import Card from 'components/card'
import Select from 'components/select'
import Button from 'components/button'
import DateField from 'components/date-field'
import PassengerInput from 'components/passenger-input'

// Styles
import * as L from 'layout'
import * as S from './styles'

type Props = {
  onChange?: any
}

enum geoHash {
  MONTREAL = 'f25dvk',
  QUEBEC = 'f2m673'
}

const OPTIONS = [
  { label: 'Montreal', value: geoHash.MONTREAL },
  { label: 'Quebec', value: geoHash.QUEBEC }
]

const TravelFilter = ({ onChange }: Props) => {
  const { t, i18n } = useTranslation()
  const CURRENCY_OPTIONS = [
    { label: t('us_dollars'), value: 'USD' },
    { label: t('ca_dollars'), value: 'CAD' },
    { label: t('euros'), value: 'EUR' },
    { label: t('br_reals'), value: 'BRL' }
  ]

  const [outboundDate, setOutboundDate] = useState<Date>(new Date())
  const [from, setFrom] = useState(OPTIONS[0])
  const [to, setTo] = useState(OPTIONS[1])
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[1])
  const [passengers, setPassengers] = useState({})

  const handleChangePassenger = (params) => setPassengers(params)

  const handleSwapPlaces = () => {
    setFrom(to)
    setTo(from)
  }

  useEffect(() => {
    setCurrency(CURRENCY_OPTIONS[1])
  }, [i18n.language])

  return (
    <L.Container>
      <Card>
        <form>
          <S.Row>
            <PassengerInput borderless onChange={handleChangePassenger} />
          </S.Row>
          <S.Box display="flex" alignItems="center" margin="0.5rem">
            <Select
              name="from"
              placeholder={t('where_from')}
              icon={<IoRadioButtonOffOutline />}
              onChange={({ target: { value } }) => setFrom({ ...value })}
              value={from}
              options={OPTIONS}
            />
            <Button circle onClick={handleSwapPlaces}>
              <MdAutorenew />
            </Button>
            <Select
              name="to"
              value={to}
              placeholder={t('where_to')}
              onChange={({ target: { value } }) => setTo({ ...value })}
              icon={<IoLocationOutline />}
              options={OPTIONS}
            />
            <DateField
              name="date"
              value={outboundDate}
              onChange={({ target: { value } }) => setOutboundDate(value)}
            />
            <Select
              name="currency"
              placeholder="Currency"
              onChange={({ target: { value } }) => setCurrency({ ...value })}
              value={currency}
              options={CURRENCY_OPTIONS}
            />
          </S.Box>
          <S.FloatButton>
            <Button
              primary
              rounded
              onClick={() => {
                onChange({
                  outboundDate: formatISO(outboundDate, {
                    representation: 'date'
                  }),
                  from: from.value,
                  to: to.value,
                  currency: currency.value,
                  passengers
                })
              }}
            >
              <L.Box display="flex" alignItems="center">
                <FiSearch /> {t('search')}
              </L.Box>
            </Button>
          </S.FloatButton>
        </form>
      </Card>
    </L.Container>
  )
}

export default TravelFilter
