// thired part libraries
import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';

// actions
import { getDepartures } from '../../actions/depatureActions'

// components
import Search from '../Search'

// styles
import { CardContainerContent } from './styled'
const Card = React.lazy(() => import('../Card'));

const CardContainer = (props) => {

  useEffect(() => {
    const compelete = (props.departures && props.departures.data.complete) || false
    if (!props.fetching && !compelete) {
      props.getDepartures(
        'dr5reg',
        'f25dvk',
        '2020-11-02'
      )
    }
  })

  return (
    <CardContainerContent>
      <Search />
      <Suspense fallback={<div>Loading...</div>}>
        {
          Object.entries(props.departures).map(([key, value], index) => {
            console.log(key, ' 1 key')
            console.log(value, ' 2 value')
          })
        }

        {/* <Card /> */}
      </Suspense>
    </CardContainerContent>
  )
}

const mapStateToProps = state => ({
  departures: state.departures,
  fetching: state.fetching
});


export default connect(mapStateToProps, { getDepartures })(CardContainer);
