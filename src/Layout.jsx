import React from 'react';
import { withRouter } from "react-router";
import Grid from '@material-ui/core/Grid';
import './Layout.scss';

const Layout = props => (
    <div className='layout'>
        <main className='main'>
            <Grid container spacing={40}>
                <Grid item xs={12}>
                    <div className='img-container'>
                        <img src='https://www.osheaga.com/uploads/osheaga/Logos/BellALtTeleLogoEN.png' alt='osheaga'></img>
                    </div>
                    {props.children}
                </Grid>
            </Grid>
        </main>
    </div>
);

export default withRouter(Layout);