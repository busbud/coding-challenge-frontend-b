import React, { useState } from 'react'
import styled from 'styled-components'
import { Box, Text, Layer, Button } from 'grommet'
import { Bus, Location } from 'grommet-icons'
import { useRouter } from 'next/router'

import { IntlText } from '../Intl/IntlText'
import { DeparturesDomain } from '../../domain/search'
import DepartureListDuration from './DepartureListDuration'
import DepartureListStep from './DepartureListStep'
import DepartureListStops from './DepartureListStops'
import { DepartureDomain } from '../../domain/departure'
import { useCurrency } from '../../store/currency/hooks'

const Container = styled(Box)`
  background: #fff;
  width: 100%;
  border-radius: ${(props) => props.theme.borderRadius};
  margin: ${(props) => props.theme.padding} auto;
  padding: ${(props) => props.theme.padding};
  box-shadow: 0px 4px 5px 0px rgba(7, 149, 255, 0.1);
  border: 1px solid #eee;

  @media screen and (min-width: 800px) {
    max-width: 800px;
  }
`

const Image = styled.img`
  height: 30px;
  margin-right: ${(props) => props.theme.padding};
`

const DepartureListItem = ({
  departure,
}: {
  departure: DeparturesDomain.DeparturesList
}) => {
  const [show, setShow] = useState(false)

  const { currency } = useCurrency()
  const { locale } = useRouter()

  return (
    <Container direction="column">
      <Box
        margin={{ bottom: '15px' }}
        direction="row"
        align="center"
        justify="between"
      >
        <Box direction="row" align="center">
          <IntlText
            id="operated_by"
            preFormat={(message: string) => (
              <Image src={departure.operator.logo_url} alt={message} />
            )}
          />
        </Box>
        <Box>
          <Text>
            {DepartureDomain.formatPrice({
              locale: locale!,
              value: departure.price_total,
              currency: currency.value,
            })}
          </Text>
        </Box>
      </Box>
      <DepartureListStep
        icon={
          (
            <Bus size="14px" style={{ marginLeft: '2px', marginTop: '-3px' }} />
          ) as any
        }
        stepDuration={departure.departure_time_zoned}
        stepName={departure.origin_city_name}
        stepLocation={departure.origin_location_name}
      />
      <DepartureListStops stops={departure.stops_count} />
      <DepartureListStep
        icon={(<Location size="20px" />) as any}
        stepDuration={departure.arrival_time_zoned}
        stepName={departure.destination_city_name}
        stepLocation={departure.destination_location_name}
      />
      <Box direction="row" justify="between" margin={{ top: '15px' }}>
        <DepartureListDuration duration={departure.travel_time} />
        <IntlText
          id="thanks"
          preFormat={(message) => (
            <Button label={message} onClick={() => setShow(true)} />
          )}
        />
      </Box>

      {/* This part definitely wouldn't exist in prod. I hope you like it */}
      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <Text
            textAlign="center"
            margin={{ vertical: '15px', horizontal: '15px' }}
            size="large"
          >
            <IntlText id="thanks_message" />
          </Text>
        </Layer>
      )}
    </Container>
  )
}

export default DepartureListItem
