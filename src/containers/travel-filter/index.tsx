// Packages
import React, { useState } from 'react'
import { formatISO } from 'date-fns'
import { MdAutorenew } from 'react-icons/md'
import { IoLocationOutline, IoRadioButtonOffOutline } from 'react-icons/io5'
import { FiSearch } from 'react-icons/fi'

// Components
import Card from 'components/card'
import Select from 'components/select'
import Button from 'components/button'
import DateField from 'components/date-field'
import PassagerInput from 'components/passenger-input'

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
  const [outboundDate, setOutboundDate] = useState<Date>(new Date())
  const [from, setFrom] = useState(OPTIONS[0])
  const [to, setTo] = useState(OPTIONS[1])
  const [passagers, setPassagers] = useState({})

  const handleChangePassager = (params) => setPassagers(params)
  const handleSwapPlaces = () => {
    setFrom(to)
    setTo(from)
  }

  return (
    <L.Container>
      <Card>
        <form>
          <S.Row>
            <PassagerInput borderless onChange={handleChangePassager} />
          </S.Row>
          <S.Box display="flex" alignItems="center" margin="0.5rem">
            <Select
              name="from"
              placeholder="Where from?"
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
              placeholder="Where to?"
              onChange={({ target: { value } }) => setTo({ ...value })}
              icon={<IoLocationOutline />}
              options={OPTIONS}
            />
            <DateField
              name="date"
              value={outboundDate}
              onChange={({ target: { value } }) => setOutboundDate(value)}
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
                  passagers
                })
              }}
            >
              <L.Box display="flex" alignItems="center">
                <FiSearch /> Search
              </L.Box>
            </Button>
          </S.FloatButton>
        </form>
      </Card>
    </L.Container>
  )
}

export default TravelFilter
