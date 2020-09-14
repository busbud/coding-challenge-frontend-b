import React from "react";
import {
    FormattedMessage
} from 'react-intl';

import { ReactComponent as Calendar} from '../assets/svg/icons/calendar.svg';
import { ReactComponent as Passengers} from '../assets/svg/icons/passengers.svg';

const SearchParametersInput = props => {
    return (
        <div className="roadToOsheaga-coachella--search-parameters-input-container">
            {
                props.type === 'date' ?
                    <Calendar className="roadToOsheaga-coachella--search-parameters-input--icon" /> :
                    <Passengers className="roadToOsheaga-coachella--search-parameters-input--icon" />
            }
            <div
                className="roadToOsheaga-coachella--search-parameters-input--content"
            >
                <input
                    className={`roadToOsheaga-coachella--search-parameters-input--${props.name}`}
                    disabled
                    id={props.name}
                    type={props.type}
                    name={props.name}
                    value={ props.value }
                />
                <p
                    className="roadToOsheaga-coachella--search-parameters-input--legend"
                >
                    <FormattedMessage
                        id={props.messageId}
                    />
                </p>
            </div>
        </div>
    );
};

export default SearchParametersInput;