import React from "react";
import {
    FormattedMessage
} from 'react-intl';

import { ReactComponent as Edit} from '../assets/svg/icons/edit.svg';

const SearchDestination = props => {
    return (
        <div className="roadToOsheaga-coachella--search-destination--section">
            <div className="roadToOsheaga-coachella--search-destination--input--container">
                <Edit className="roadToOsheaga-coachella--search-destination--icon" />
                <input
                    className="roadToOsheaga-coachella--search-destination--city"
                    id={props.name}
                    disabled
                    type="text"
                    name={props.name}
                    value={ props.value }
                />
                <p
                    className="roadToOsheaga-coachella--search-destination--legend"
                >
                    <FormattedMessage
                        id={props.messageId}
                    />
                </p>
            </div>
        </div>
    );
};

export default SearchDestination;