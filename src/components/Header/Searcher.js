import React from 'react';
import { useTranslation } from "react-i18next";

export default function SearcherComponent({triggerSearch, changeDeparture, enabled, departure}){
    const { t } = useTranslation();
    return(
        <div className="searcher">
            <input disabled={enabled} type="date" placeholder="departure" onChange={changeDeparture} defaultValue={departure}/>
            <button disabled={enabled} onClick={triggerSearch} className="button">{t("search")}</button>
        </div>
    )
}

