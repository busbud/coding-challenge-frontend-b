import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { ArrowRight } from 'styled-icons/feather'

import * as schedulesSelectors from '../../store/services/schedules/selectors'

import Container from '../Container'

import {
  StyledContent,
  StyledDate,
  StyledHeader,
  StyledTitle,
} from './styles'

const Header = (props) => (
  <StyledHeader>
    <Container>
      <StyledContent>
        <StyledTitle>
          {props.cities[0] && props.cities[0].name}
          <ArrowRight size={26} />
          {props.cities[1] && props.cities[1].name}
        </StyledTitle>

        <StyledDate>
          {moment(props.date).format('LL')}
        </StyledDate>
      </StyledContent>
    </Container>
  </StyledHeader>
)

const mapStateToProps = state => ({
  cities: schedulesSelectors.getCities(state),
})

export default connect(mapStateToProps)(Header)