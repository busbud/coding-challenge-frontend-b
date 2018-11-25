import React from 'react';
import { withNamespaces } from "react-i18next";
import Typography from '@material-ui/core/Typography';

const NotFound = props =>
    <div>
        <Typography variant="h4" gutterBottom align='center'>
            {props.t('404.title')}
        </Typography>
        <Typography variant="h6" gutterBottom align='center'>
            {props.t('404.description')}
        </Typography>
    </div>;

export default withNamespaces()(NotFound);