import React from "react";
import { FormattedMessage, FormattedNumber } from 'react-intl';

export default function Home() {
    return (
        <p>
            <FormattedMessage
                id="myMessage"
                defaultMessage="Today is {ts, date, ::yyyyMMdd}"
                values={{ts: Date.now()}}
            />
            <br />
            <FormattedNumber value={19} style="currency" currency="EUR" />
        </p>
    );
}