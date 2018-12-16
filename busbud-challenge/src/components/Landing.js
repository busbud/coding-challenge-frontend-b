import React, { Fragment, Component } from 'react';
import { Link } from "react-router-dom";
import { Image, Heading, Button } from 'rebass';
import { CenteredContainer } from './ui-components'

class Landing extends Component {
    render() {
        return (
					<CenteredContainer>
						<Image src='https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png' />
						<Heading as='h1' color='white' fontSize={[3,4,5]}>Tickets from New York to Montreal for the 2nd August 2019!</Heading>
						<Link to="/search">
							<Button
								bg='#bf5648'
								px={4}
								py={4}
								fontSize={[5,6,7]}
								m={4}
							>
							Find Bus rides!</Button>
						</Link>
					</CenteredContainer>
        )
    }
}

export default Landing;