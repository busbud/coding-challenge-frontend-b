import React from 'react';
import { useTranslation } from "react-i18next";

export default function BudHeader(props){
    const { t } = useTranslation();
    return(
        <div className="header">
            <h1>{t('title')}<br></br>{t('subtitle')}</h1>
            <h4>{t('greetings')}</h4>
        </div>
    )
}