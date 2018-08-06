import React from 'react'
import { Card } from 'semantic-ui-react'

class NoDepartures extends React.Component {
  render () {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>Sorry</Card.Header>
          <Card.Description>
            No Departures Found
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

export default NoDepartures
