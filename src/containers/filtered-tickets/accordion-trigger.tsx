// Packages
import React from 'react'
import { format } from 'date-fns-tz'
import { getTime, formatDistanceStrict } from 'date-fns'
import { BsArrowRight, BsFillCircleFill } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'

// Helpers
import formatCurrency from 'helpers/currency'

// Styles
import * as L from 'layout'
import * as S from './styles'

const AccordionTrigger = ({ departure, operator, currency }: any) => {
  const { t } = useTranslation()
  const departureTime = getTime(new Date(departure.departure_time))
  const arrivalTime = getTime(new Date(departure.arrival_time))
  const duration = formatDistanceStrict(
    new Date(departure.departure_time),
    new Date(departure.arrival_time)
  ).replace('hours', t('hours'))
  const hasStop =
    departure?.trip_stops.length > 0
      ? `${departure?.trip_stops.length} ${t('stop')}`
      : 'Nonstop'

  return (
    <section>
      <L.Box display="flex" alignItems="center" justifyContent="space-between">
        <S.Image src={operator?.logo_url} alt="" />
        <S.Text className="text__medium" bold>
          {formatCurrency({ amount: departure?.prices.total, currency })}
        </S.Text>
      </L.Box>
      <S.BusInfo>
        <L.Box display="flex" alignItems="center" margin="1rem 0 1rem">
          <S.Text bold>
            {format(departureTime, 'hh:mm aaa', {
              timeZone: departure?.departure_timezone
            })}
          </S.Text>
          <BsArrowRight className="svg__arrow" />
          <S.Text bold>
            {format(arrivalTime, 'hh:mm aaa', {
              timeZone: departure?.arrival_timezone
            })}
          </S.Text>
        </L.Box>
      </S.BusInfo>
      <S.BusInfo>
        <L.Box display="flex" alignItems="center">
          <S.Text>{hasStop}</S.Text>
          <BsFillCircleFill className="svg__circle" />
          <S.Text>{duration}</S.Text>
        </L.Box>
      </S.BusInfo>
    </section>
  )
}

export default AccordionTrigger
