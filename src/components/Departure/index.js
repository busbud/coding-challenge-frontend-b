import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'

import * as schedulesSelectors from '../../store/services/schedules/selectors'

import {
  StyledCity,
  StyledCityName,
  StyledDeparture,
  StyledDepartureContent,
  StyledDepartureSchedule,
  StyledHeader,
  StyledOperator,
  StyledPrice,
  StyledTime,
} from './styles'

const Departure = (props) => (
  <StyledDeparture>
    <StyledDepartureContent>
      <StyledHeader>
        <StyledOperator>
          {(props.operator && props.operator.logo_url) ?
            <img height="25" width="130" src={props.operator.logo_url} alt={props.operator.display_name} />
            : null}
        </StyledOperator>
        <StyledPrice>{numeral(props.departure.prices.total / 100).format('$0,0')}</StyledPrice>
      </StyledHeader>
      <StyledDepartureSchedule>
        <StyledTime primary>{moment(props.departure.departure_time).format('LT')}</StyledTime>
        <StyledCity primary><StyledCityName>{props.cities[0].name}</StyledCityName>{props.originLocation}</StyledCity>
      </StyledDepartureSchedule>

      <StyledDepartureSchedule>
        <StyledTime>{moment(props.departure.arrival_time).format('LT')}</StyledTime>
        <StyledCity><StyledCityName>{props.cities[1].name}</StyledCityName>{props.destinationLocation}</StyledCity>
      </StyledDepartureSchedule>
    </StyledDepartureContent>
  </StyledDeparture>
)

const mapStateToProps = (state, ownProps) => {
  return {
    destinationLocation: schedulesSelectors.getLocationNameById({ locationId: ownProps.departure.destination_location_id })(state),
    operator: schedulesSelectors.getOperatorById({ operatorId: ownProps.departure.operator_id })(state),
    originLocation: schedulesSelectors.getLocationNameById({ locationId: ownProps.departure.origin_location_id })(state),
  }
}

export default connect(mapStateToProps)(Departure)