import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contentLanguages} from "../../utils/language";
import { selectSchedulesFromState} from "../../store/schedules/selectors";
import { selectLanguageFromState} from "../../store/language/selectors";

const contents = () => {
    const { language } = useSelector(selectLanguageFromState);
    console.log(language)
    contentLanguages.setLanguage(language);
    return (
        <>
            <div>{contentLanguages.search}</div>
        </>
    );
};

export default contents;
