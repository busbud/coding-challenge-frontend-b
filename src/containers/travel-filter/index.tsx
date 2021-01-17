// Packages
import React, { useState } from 'react'
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

const TravelFilter = () => {
  const [date, setDate] = useState<Date>(new Date())
  const [from, setFrom] = useState({ label: 'Montreal', value: 'Montreal' })
  const [to, setTo] = useState({ label: 'Quebec', value: 'Quebec' })

  const handleChangePassager = (params) => console.log('passagers', params)
  const handleChangeCountry = (params) => console.log(params)
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
              onChange={handleChangeCountry}
              value={from}
              options={[
                { label: 'Montreal', value: 'Montreal' },
                { label: 'Quebec', value: 'Quebec' }
              ]}
            />
            <Button circle onClick={handleSwapPlaces}>
              <MdAutorenew />
            </Button>
            <Select
              name="to"
              value={to}
              placeholder="Where to?"
              onChange={handleChangeCountry}
              icon={<IoLocationOutline />}
              options={[
                { label: 'Montreal', value: 'Montreal' },
                { label: 'Quebec', value: 'Quebec' }
              ]}
            />
            <DateField
              name="date"
              value={date}
              onChange={({ target: { value } }) => setDate(value)}
            />
          </S.Box>
          <S.FloatButton>
            <Button primary rounded onClick={() => console.log('clicked')}>
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
