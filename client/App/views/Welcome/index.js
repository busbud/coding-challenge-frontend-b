import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Grid, Card, Button, Image } from 'semantic-ui-react'
import './index.scss'
import logo from './static/oshega_logo.png'
import bus from './static/bus.png'

export default class Welcome extends React.Component {
  render () {
    return (
      <Container className="welcome-wrap">
        <Grid
          verticalAlign={'middle'}
          centered={true}
        >
          <Grid.Row>
            <Grid.Column
              mobile={15}
              tablet={9}
              computer={8}
              largeScreen={7}
              textAlign={'center'}
            >
              <Card fluid>
                <Card.Content>
                  <div className="logo-wrap">
                    <Image src={logo} size={'small'} />
                  </div>
                  <Card.Header>Lets go to Oshega</Card.Header>
                  <div className="bus-wrap">
                    <Image src={bus} size={'small'} />
                  </div>
                </Card.Content>
                <Card.Content extra>
                  <div>
                    <Link to="/search-form">
                      <Button primary>Book Tickets Now</Button>
                    </Link>
                  </div>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}
