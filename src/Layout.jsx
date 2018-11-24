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
                        <img src='https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png' alt='osheaga'></img>
                    </div>
                    {props.children}
                </Grid>
            </Grid>
        </main>
    </div>
);

export default withRouter(Layout);