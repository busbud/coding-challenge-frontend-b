import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

class DepartureCard extends React.Component {
  render () {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>Matthew</Card.Header>
          <Card.Meta>
            <span className='date'>Joined in 2015</span>
          </Card.Meta>
          <Card.Description>
            Matthew is a musician living in Nashville
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            22 Friends
          </a>
        </Card.Content>
      </Card>
    )
  }
}

export default DepartureCard
