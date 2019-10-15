import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import './lib/i18n';
import Home from "./views/Home";
import {CircularProgress, CssBaseline, Box} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import theme from "./material/Theme";
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from "redux";
import {reducer} from "./store/reducer";
import reduxThunk from 'redux-thunk';



const store = createStore(
    reducer,
    applyMiddleware(reduxThunk)
);

// loading component for suspense fallback
const Loader = () => (
    <Box position={'absolute'} width={'100%'} height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <CircularProgress size={80} thickness={4} color={'secondary'}/>
    </Box>
);



ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Suspense fallback={<Loader/>}>
                <Home/>
            </Suspense>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
