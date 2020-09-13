import React from "react";
import { FormattedMessage } from 'react-intl';
import {
  Link
} from "react-router-dom";

export default function Home() {
    return (
        <div className="roadToOsheaga-home--container">
            <h1>
                <FormattedMessage
                    id="home.Cancellation.header"
                    defaultMessage="Oh no!"
                />
            </h1>
            <p>
                <FormattedMessage
                    id="home.Cancellation.message"
                    defaultMessage="Oh no!"
                />
            </p>
            <p>
                <FormattedMessage
                    id="home.Cancellation.solution.title"
                    defaultMessage="Oh no!"
                />
            </p>
            <p>
                <FormattedMessage
                    id="home.Cancellation.solution.message"
                    defaultMessage="Oh no!"
                    values={{
                        b: (...chunks) => <b>{chunks}</b>
                    }}
                />
            </p>
            <button className="roadToOsheaga-home--button">
                <Link to="/coachella">
                    <FormattedMessage
                        id="home.redirection.message"
                        defaultMessage="Go to Coachella"
                    />
                </Link>
            </button>
        </div>
    );
}