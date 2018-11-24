import React from 'react';
import { withRouter } from "react-router";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Layout = props => (
    <div>
        <AppBar position="fixed">
            <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
                Osheaga bus finder
            </Typography>
            </Toolbar>
        </AppBar>
        <main>
            <div />
            {props.children}
        </main>
    </div>
);

export default withRouter(Layout);