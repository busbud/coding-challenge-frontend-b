import React, { Fragment, Component } from 'react';
import { Link } from "react-router-dom";

class Landing extends Component {
    render() {
        return (
					<Fragment>
						<h1>Landing</h1>
						<Link to="/search"><h1>Find Bus rides!</h1></Link>
					</Fragment>
        )
    }
}

export default Landing;