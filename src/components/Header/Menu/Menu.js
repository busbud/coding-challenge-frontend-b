import React from 'react';
import MenuItem from './MenuItem'
import {ReactComponent as Logo} from './logo.svg'
import { useTranslation } from "react-i18next";

function changeLanguage(e, I18n){
    I18n.i18n.changeLanguage(e.target.value) // -> returns a Promise
}
export default function Menu(props){
    const I18n = useTranslation();
    return(
        <div className="menu">
            <Logo className="menu-logo"/>
            <select className="localization" onChange={(e) => changeLanguage(e, I18n)}>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
            </select>            
        </div>
    )
}