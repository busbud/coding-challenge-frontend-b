import React from 'react'
import { Grid, Card, Button, Image } from 'semantic-ui-react'
import AppTopbar from './components/AppTopbar'
import AppFooter from './components/AppFooter'
import './index.scss'
import logo from './static/oshega_logo.png'
import bus from './static/bus.png'

export default class App extends React.Component {
  render () {
    return (
      <div className="app-wrap">
        <AppTopbar />
        <Grid
          className="app-grid"
          verticalAlign={'middle'}
          textAlign={'center'}
        >
          <Grid.Row>
            <Grid.Column mobile={15} tablet={9} largeScreen={6}>
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
                    <Button primary>Book Tickets Now</Button>
                  </div>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <AppFooter />
      </div>
    )
  }
}
