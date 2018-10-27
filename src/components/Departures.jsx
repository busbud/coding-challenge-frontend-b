import React from 'react';
import Loading from './Loading';

export default class Departures extends React.Component {
  render() {
    const { schedules } = this.props
    return (
      <div className='depatures'>
        { schedules.departures.map( (depature, index) => <Depature key={index} depature={depature} /> ) }
        { schedules.isLoading && <Loading /> }
      </div>
    )
  }
}

const Depature = ({depature}) => (
  <div className='depature'>
    {depature.id}
  </div>
)
