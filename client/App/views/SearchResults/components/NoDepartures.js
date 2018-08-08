import React from 'react'
import { Card, Header, Icon } from 'semantic-ui-react'

class NoDepartures extends React.Component {
  render () {
    return (
      <Card fluid>
        <Card.Content textAlign={'center'}>
          <Header as='h4' icon>
            <Icon name='frown outline' />
            Sorry
            <Header.Subheader>No Departures Found</Header.Subheader>
          </Header>
        </Card.Content>
      </Card>
    )
  }
}

export default NoDepartures
